import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

const Page = () => {
  return (
    <div>
      <div className="bg-background ">
        Docs
        <Link href={"/documents/123"}>
          <Button>Go /documents/123</Button>
        </Link>
      </div>
    </div>
  );
};

export default Page;
