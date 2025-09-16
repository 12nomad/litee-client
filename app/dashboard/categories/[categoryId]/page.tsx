import Category from "@/app/dashboard/categories/[categoryId]/components/category";

interface Props {
  params: {
    categoryId: string;
  };
}

async function DashboardCategoriePage({ params }: Props) {
  const routeParams = await params;
  const categoryId = routeParams.categoryId;

  return <Category categoryId={+categoryId} />;
}

export default DashboardCategoriePage;
