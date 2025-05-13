"use client";

import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { SlidersHorizontal } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Slider } from "../ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const categories = [
  { id: "template", label: "Templates" },
  { id: "ui-kit", label: "UI Kits" },
  { id: "plugin", label: "Plugins" },
  { id: "icon-set", label: "Icon Sets" },
  { id: "theme", label: "Themes" },
];

export default function ProjectsFilter() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [priceRange, setPriceRange] = useState([0, 100]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [priceSort, setPriceSort] = useState<string | null>(null);

  // Initialize from URL params
  useEffect(() => {
    const categoriesParam = searchParams.get("categories");
    const categoryParam = searchParams.get("category"); // For direct category links

    // Only update state if the values are different to prevent loops
    if (categoriesParam) {
      const newCategories = categoriesParam.split(",").filter(Boolean);
      if (
        JSON.stringify(newCategories) !== JSON.stringify(selectedCategories)
      ) {
        setSelectedCategories(newCategories);
      }
    } else if (
      categoryParam &&
      selectedCategories.length !== 1 &&
      selectedCategories[0] !== categoryParam
    ) {
      setSelectedCategories([categoryParam]);
    }

    const minPrice = searchParams.get("minPrice");
    const maxPrice = searchParams.get("maxPrice");

    if (minPrice && maxPrice) {
      const newPriceRange = [
        Number.parseInt(minPrice),
        Number.parseInt(maxPrice),
      ];
      if (
        newPriceRange[0] !== priceRange[0] ||
        newPriceRange[1] !== priceRange[1]
      ) {
        setPriceRange(newPriceRange);
      }
    }

    const sortParam = searchParams.get("sort");
    if (sortParam && sortParam !== priceSort) {
      setPriceSort(sortParam);
    }
  }, [searchParams, selectedCategories, priceRange, priceSort]);

  const createQueryString = (params: Record<string, string | null>) => {
    const newParams = new URLSearchParams(searchParams.toString());

    Object.entries(params).forEach(([name, value]) => {
      if (value === null) {
        newParams.delete(name);
      } else {
        newParams.set(name, value);
      }
    });

    return newParams.toString();
  };

  const handleCategoryChange = (category: string, checked: boolean) => {
    let newCategories: string[];

    if (checked) {
      newCategories = [...selectedCategories, category];
    } else {
      newCategories = selectedCategories.filter((c) => c !== category);
    }

    setSelectedCategories(newCategories);

    // Update URL
    const queryString = createQueryString({
      categories: newCategories.length > 0 ? newCategories.join(",") : null,
      category: null, // Remove single category param if it exists
    });

    router.push(`${pathname}?${queryString}`);
  };

  const handlePriceChange = (values: number[]) => {
    setPriceRange(values);
  };

  const handlePriceInputChange = (index: number, value: string) => {
    const newPriceRange = [...priceRange];
    newPriceRange[index] = Math.min(Math.max(Number(value), 0), 100); // Clamp values between 0 and 100
    setPriceRange(newPriceRange);
  };

  const applyPriceFilter = () => {
    const queryString = createQueryString({
      minPrice: priceRange[0].toString(),
      maxPrice: priceRange[1].toString(),
    });

    router.push(`${pathname}?${queryString}`);
  };

  const handlePriceSortChange = (value: string) => {
    setPriceSort(value);

    const queryString = createQueryString({
      sort: value,
    });

    router.push(`${pathname}?${queryString}`);
  };

  return (
    <div>
      {/* Mobile Filter Button */}
      <div className="md3hidden">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="sm" className="w-full gap-1">
              <SlidersHorizontal className="h-4 w-4" /> Filters
            </Button>
          </SheetTrigger>
          <SheetContent side="left">
            <div className="grid gap-6 py-6">
              <div className="space-y-4">
                <h3 className="font-medium">Categories</h3>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <div key={category.id} className="flex items-center gap-2">
                      <Checkbox
                        id={`mobile-category-${category.id}`}
                        checked={selectedCategories.includes(category.id)}
                        onCheckedChange={(checked) =>
                          handleCategoryChange(category.id, checked === true)
                        }
                      />
                      <Label
                        htmlFor={`mobile-category-${category.id}`}
                        className="text-sm font-normal"
                      >
                        {category.label}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
              {/* <div className="space-y-4">
                <h3 className="font-medium">Price Range</h3>
                <div className="space-y-4">
                  <Slider
                    defaultValue={[0, 100]}
                    max={100}
                    step={1}
                    value={priceRange}
                    onValueChange={handlePriceChange}
                  />
                  <div className="flex items-center justify-between">
                    <span className="text-sm">${priceRange[0]}</span>
                    <span className="text-sm">${priceRange[1]}</span>
                  </div>
                  <Button size="sm" onClick={applyPriceFilter}>
                    Apply
                  </Button>
                </div>
              </div>
              <div className="space-y-4">
                <h3 className="font-medium">Sort by Price</h3>
                <Select
                  value={priceSort || ""}
                  onValueChange={handlePriceSortChange}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select an option" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="cheap-to-expensive">
                      From Cheap to Expensive
                    </SelectItem>
                    <SelectItem value="expensive-to-cheap">
                      From Expensive to Cheap
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div> */}
            </div>
          </SheetContent>
        </Sheet>
      </div>

      {/* Desktop Filters */}
      <div className="hidden space-y-6 md3block">
        <Accordion type="multiple" defaultValue={["categories", "price"]}>
          <AccordionItem value="categories">
            <AccordionTrigger>Categories</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-2">
                {categories.map((category) => (
                  <div key={category.id} className="flex items-center gap-2">
                    <Checkbox
                      id={`category-${category.id}`}
                      checked={selectedCategories.includes(category.id)}
                      onCheckedChange={(checked) =>
                        handleCategoryChange(category.id, checked === true)
                      }
                    />
                    <Label
                      htmlFor={`category-${category.id}`}
                      className="text-sm font-normal"
                    >
                      {category.label}
                    </Label>
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
          {/* <AccordionItem value="price">
            <AccordionTrigger>Sort by Price</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-4">
                <Label htmlFor="price-sort" className="text-sm font-medium">
                  Sort Options
                </Label>
                <Select
                  value={priceSort || ""}
                  onValueChange={handlePriceSortChange}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select an option" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="cheap-to-expensive">
                      From Cheap to Expensive
                    </SelectItem>
                    <SelectItem value="expensive-to-cheap">
                      From Expensive to Cheap
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </AccordionContent>
          </AccordionItem> */}
          <AccordionItem value="rating">
            <AccordionTrigger>Rating</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-2">
                {[5, 4, 3, 2, 1].map((rating) => (
                  <div key={rating} className="flex items-center gap-2">
                    <Checkbox id={`rating-${rating}`} />
                    <Label
                      htmlFor={`rating-${rating}`}
                      className="text-sm font-normal"
                    >
                      {rating} Stars & Up
                    </Label>
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
}
