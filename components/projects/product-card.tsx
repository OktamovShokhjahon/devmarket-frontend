import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/lib/types";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <Card className="overflow-hidden transition-all hover:shadow-md">
      <Link href={`/projects/${product.id}`}>
        <div className="aspect-video overflow-hidden">
          <Image
            src={product.image || "/placeholder.svg"}
            alt={product.title}
            width={400}
            height={225}
            className="h-full w-full object-cover transition-transform hover:scale-105"
          />
        </div>
      </Link>
      <CardContent className="p-4">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Badge variant="outline">{product.category}</Badge>
            <div className="flex items-center text-yellow-500">
              <Star className="mr-1 h-4 w-4 fill-current" />
              <span className="text-sm">{product.rating}</span>
            </div>
          </div>
          <Link href={`/projects/${product.id}`} className="group">
            <h3 className="font-semibold group-hover:text-primary">
              {product.title}
            </h3>
          </Link>
          <p className="line-clamp-2 text-sm text-muted-foreground">
            {product.description}
          </p>
        </div>
      </CardContent>
      <CardFooter className="flex items-center justify-between border-t bg-muted/40 p-4">
        <div className="text-sm text-muted-foreground">By {product.seller}</div>
        <div className="font-semibold">${product.price.toFixed(2)}</div>
      </CardFooter>
    </Card>
  );
}
