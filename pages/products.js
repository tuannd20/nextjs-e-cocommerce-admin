import Layout from "@/components/Layout";
import Link from "next/link";

const Products = () => {
  return (
    <div className="">
      <Layout>
        <div className="flex flex-row-reverse p-4">
          <Link
            href="/products/new"
            className="bg-blue-500 rounded-md py-2 px-3 text-white text-center font-bold"
          >
            Add new product
          </Link>
        </div>
      </Layout>
    </div>
  );
};

export default Products;
