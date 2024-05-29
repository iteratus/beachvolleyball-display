import Image from "next/image";
import type { ProductData } from "@/lib/Types";
import { Lato, Poppins } from "next/font/google";
import Description from "@/components/Description";
import { buildNodeObjectFromBBCode } from "@/lib/textUtils";

const poppins = Poppins({ weight: "400", subsets: ["latin"] });
const latoBold = Lato({ weight: "700", subsets: ["latin"] });

interface ProductDetailProps {
  product: ProductData;
}

export default function ProductDetail({ product }: ProductDetailProps) {
  if (!product) {
    return "Produkt wird geladen...";
  }

  return (
    <div className="grid gap-[5%] detailGrid">
      {product.image?.sourceUrl ? (
        <Image
          src={product.image.sourceUrl}
          width={240}
          height={240}
          alt={product.parent.node.name}
          style={{ width: "100%", objectFit: "cover", aspectRatio: "1 / 1" }}
        />
      ) : (
        <div className="w-28 h-28" />
      )}
      <div className="py-[1vw]">
        <div className="text-detailBreadcrumbs">{product.breadcrumbs}</div>
        <div
          className={`${poppins.className} text-detailProduct pt-[0.5vw] pb-[2vw]`}
        >
          {product.parent.node.name.replace("/", " / ")}
        </div>
        <div className="pb-[1.5vw]">
          <Description
            nodeObject={buildNodeObjectFromBBCode(
              product.parent.node?.description,
            )}
          />
        </div>
        <div className="text-detailPrize pt-[1vw]">
          {product.onSale ? (
            <>
              <span className="line-through text-gray-500 pr-[0.7vw]">
                {product.regularPrice?.replace("&nbsp;", " ")}
              </span>
              <span className="text-saleColor font-bold">
                {product.price?.replace("&nbsp;", " ")}
              </span>
            </>
          ) : (
            product.price?.replace("&nbsp;", " ")
          )}
        </div>
        <div className="text-listingAdditionalInfo text-gray-500 pt-[0.5vw]">
          <span className={`${latoBold.className} text-black`}>
            Lagerstand:
          </span>{" "}
          {`${product.stockQuantity} Stück`}
        </div>
      </div>
    </div>
  );
}
