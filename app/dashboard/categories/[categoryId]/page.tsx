import Category from "@/components/app/dashboard/category/Category";

interface Props {
  params: {
    categoryId: string;
  };
}

async function DashboardCategoriePage({ params }: Props) {
  const routeParams = await params;
  const categoryId = routeParams.categoryId;

  return <Category categoryId={categoryId} />;
}

export default DashboardCategoriePage;
