import { useState } from "react";
import { ChevronDown, ChevronRight, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const categories = [
  {
    name: "Electronics",
    subcategories: ["Smartphones", "Laptops", "Tablets", "Accessories"],
  },
  {
    name: "Fashion",
    subcategories: ["Men", "Women", "Kids", "Accessories"],
  },
  {
    name: "Home & Living",
    subcategories: ["Furniture", "Kitchen", "Decor", "Bedding"],
  },
  {
    name: "Beauty & Health",
    subcategories: ["Skincare", "Makeup", "Haircare", "Wellness"],
  },
  {
    name: "Sports & Outdoors",
    subcategories: ["Exercise", "Camping", "Sports Equipment", "Activewear"],
  },
  {
    name: "Books & Media",
    subcategories: ["Books", "Movies", "Music", "Games"],
  },
];

const Sidebar = ({ isOpen, onClose }: SidebarProps) => {
  const [expandedCategories, setExpandedCategories] = useState<string[]>([]);

  const toggleCategory = (categoryName: string) => {
    setExpandedCategories((prev) =>
      prev.includes(categoryName)
        ? prev.filter((name) => name !== categoryName)
        : [...prev, categoryName]
    );
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 md:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed md:sticky top-0 left-0 h-screen w-64 bg-card border-r z-50 transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        <div className="flex items-center justify-between p-4 border-b md:hidden">
          <h2 className="font-semibold text-lg">Categories</h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        </div>

        <div className="hidden md:block p-4 border-b">
          <h2 className="font-semibold text-lg">Categories</h2>
        </div>

        <ScrollArea className="h-[calc(100vh-4rem)]">
          <div className="p-2">
            {categories.map((category) => (
              <div key={category.name} className="mb-1">
                <Button
                  variant="ghost"
                  className="w-full justify-between hover:bg-sidebar-accent"
                  onClick={() => toggleCategory(category.name)}
                >
                  <span className="font-medium">{category.name}</span>
                  {expandedCategories.includes(category.name) ? (
                    <ChevronDown className="h-4 w-4" />
                  ) : (
                    <ChevronRight className="h-4 w-4" />
                  )}
                </Button>

                {expandedCategories.includes(category.name) && (
                  <div className="ml-4 mt-1 space-y-1 animate-accordion-down">
                    {category.subcategories.map((sub) => (
                      <Button
                        key={sub}
                        variant="ghost"
                        size="sm"
                        className="w-full justify-start text-muted-foreground hover:text-foreground hover:bg-sidebar-accent"
                      >
                        {sub}
                      </Button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </ScrollArea>
      </aside>
    </>
  );
};

export default Sidebar;
