"use client";

import { useEffect, useState } from "react";
import { useCSVReader } from "react-papaparse";
import { toast } from "sonner";
import {
  CheckCircleIcon,
  PlusCircleIcon,
  XCircleIcon,
} from "@heroicons/react/24/outline";
import Button from "@/components/shared/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Select } from "@radix-ui/react-select";
import {
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  formatToYMD,
  isValidDateAndFormat,
  toMiliUnits,
  transformDataColumnsToRows,
} from "@/lib/utils";
import useBulkCreateMutation from "@/app/dashboard/transactions/hooks/use-bulk-create-transactions.mutation";
import useGetAccountsQuery from "@/app/dashboard/accounts/hooks/use-get-accounts.query";
import CreateAccountFromSelect from "@/app/dashboard/accounts/components/create-account-from-select";

interface ImportResult {
  data: string[][];
  errors: string[][];
  meta: string[][];
}

enum ValidHeaders {
  Description = "Description",
  Payee = "Payee",
  Amount = "Amount",
  Date = "Date",
}

interface SelectedHeader {
  name: string;
  index: number;
  data: string[];
}

function UploadArea() {
  const { data: accounts } = useGetAccountsQuery(true);
  const [accountId, setAccountId] = useState("");
  const [importResult, setImportResult] = useState<ImportResult | null>(null);
  const [tableHeaders, setTableHeaders] = useState<string[]>([]);
  const [tableBody, setTableBody] = useState<string[][]>([]);
  const [selectedHeader, setSelectedHeader] = useState<SelectedHeader[]>([]);
  const [selectedHeaders, setSelectedHeaders] = useState<string[]>([]);
  const { CSVReader } = useCSVReader();
  const { mutateAsync, isPending, isSuccess } = useBulkCreateMutation();

  useEffect(() => {
    if (!isPending && isSuccess) handleCancelFileUpload();
  }, [isPending, isSuccess]);

  const handleSetAccountId = (value: string) => setAccountId(value);

  const handleFileUpload = (res: ImportResult) => {
    setImportResult(res);
    setTableHeaders(res.data[0]);
    setTableBody(res.data.slice(1));
  };

  const handleCancelFileUpload = () => {
    setImportResult(null);
    setTableHeaders([]);
    setTableBody([]);
    setSelectedHeader([]);
    setSelectedHeaders([]);
    setAccountId("");
  };

  const handleHeaderSelect = (value: string, idx: number) => {
    setSelectedHeaders((prev) => {
      const updated = [...prev];
      updated[idx] = value;
      return updated;
    });

    if (value && value !== "Skip") {
      setSelectedHeader((prev) => [
        ...prev.filter(
          (h) =>
            h.name !==
            ValidHeaders[tableHeaders[idx] as keyof typeof ValidHeaders]
        ),
        {
          name: value,
          data: tableBody.map((arr) => arr[idx]),
          index: idx,
        },
      ]);
    } else {
      setSelectedHeader((prev) => {
        return prev.filter((h) => h.index !== idx);
      });
    }
  };

  const handleCreateBulkTransactions = async () => {
    const dto = transformDataColumnsToRows(selectedHeader, accountId);

    const validatedData = dto
      .filter((el) => {
        if (!el.date) return true;

        const amountNum = Number(el.amount);
        const validAmount = !isNaN(amountNum);
        const validDate = isValidDateAndFormat(el.date);
        return validAmount && validDate;
      })
      .map((el) => {
        if (!el.date)
          return {
            ...el,
            amount: toMiliUnits(+el.amount),
            accountId: +el.accountId,
            date: formatToYMD(new Date().toString()),
          };

        return {
          ...el,
          amount: toMiliUnits(+el.amount),
          accountId: +el.accountId,
        };
      });

    if (validatedData.length === 0) {
      toast.error(
        "Invalid inputs. Please review the Amount or the Date column to match the correct data type."
      );
      return;
    }

    await mutateAsync({ transactions: validatedData });
  };

  if (importResult !== null) {
    return (
      <>
        <div className="mb-4 flex justify-between items-start">
          <div>
            <label className="block mb-2 text-sm text-gray-900 dark:text-white">
              In which account would you want to add these transactions?
            </label>
            <Select onValueChange={handleSetAccountId}>
              <SelectTrigger className="w-1/2 my-2">
                <SelectValue placeholder="Select an account..." />
              </SelectTrigger>
              <SelectContent className="w-full">
                <SelectGroup>
                  {accounts?.map((a) => (
                    <SelectItem key={a.name} value={a.id.toString()}>
                      {a.name}
                    </SelectItem>
                  ))}
                </SelectGroup>
                <SelectSeparator />
                <SelectGroup className="w-full">
                  <CreateAccountFromSelect accounts={accounts} />
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <Button variant="danger" rounded onClick={handleCancelFileUpload}>
            <XCircleIcon className="size-5" />
            <p>Abort import</p>
          </Button>
        </div>
        <div className="rounded-md border mt-2">
          <Table className="border rounded-md overflow-hidden">
            <TableHeader>
              <TableRow>
                {tableHeaders?.map((_, idx) => {
                  return (
                    <TableHead key={idx}>
                      <Select
                        onValueChange={(value) =>
                          handleHeaderSelect(value, idx)
                        }
                        defaultValue="Skip"
                      >
                        <SelectTrigger className="w-full my-2">
                          <SelectValue placeholder={idx} />
                        </SelectTrigger>
                        <SelectContent className="w-full">
                          <SelectGroup>
                            {Object.values(ValidHeaders)?.map((h) => (
                              <SelectItem
                                key={h}
                                value={h}
                                disabled={selectedHeaders
                                  .filter((v, i) => i !== idx && v !== "Skip")
                                  .includes(h)}
                              >
                                {h === ValidHeaders.Date
                                  ? `${h} (YYYY-MM-DD)`
                                  : h}
                              </SelectItem>
                            ))}
                            <SelectItem value="Skip">Skip</SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </TableHead>
                  );
                })}
              </TableRow>
            </TableHeader>
            <TableBody>
              {tableBody?.map((row, idx) => (
                <TableRow key={idx}>
                  {row?.map((cell) => (
                    <TableCell key={cell}>{cell}</TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <div className="mt-4">
          <p className="mb-2 text-sm font-medium">
            <sup>* </sup>Make sure to select an account as well as the following
            columns: Description, Amount, Payee, Date
          </p>
          <Button
            variant="primary"
            rounded
            onClick={handleCreateBulkTransactions}
            disabled={
              !accountId ||
              !Object.values(ValidHeaders).every((validHeader) =>
                selectedHeaders.includes(validHeader)
              ) ||
              isPending
            }
          >
            <CheckCircleIcon className="size-5" />
            <p>Continue</p>
          </Button>
        </div>
      </>
    );
  }

  return (
    <>
      <CSVReader onUploadAccepted={handleFileUpload}>
        {({ getRootProps }: { getRootProps: () => object }) => (
          <>
            <div className="flex items-center justify-center w-full">
              <label
                htmlFor="dropzone-file"
                className="flex flex-col items-center justify-center w-full h-[calc(100vh-150px)] border-2 border-gray-300 border-dashed rounded-lg cursor-pointer"
              >
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <PlusCircleIcon className="size-8 mb-4 text-gray-500" />
                  <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                    <span className="font-semibold">
                      Click to add a CSV file
                    </span>
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    The CSV file must have the following fields: Description,
                    Amount, Payee, Date (YYYY-MM-DD)
                  </p>
                </div>
                <input
                  {...getRootProps()}
                  id="dropzone-file"
                  className="hidden"
                  accept=".csv"
                />
              </label>
            </div>
          </>
        )}
      </CSVReader>
    </>
  );
}

export default UploadArea;
