"use client";
import { useObject } from "@/app/hooks/useObject";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const prompt = "Generate a lasagna recipe.";

const Object = () => {
  const { object, isLoading, generate, error } = useObject("recipe");

  return (
    <div className="flex flex-col w-full max-w-md py-12 mx-auto space-y-6">
      <Card className="p-6 shadow-lg">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">
            Recipe Generator
          </CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading && (
            <div className="space-y-4">
              <Skeleton className="h-6 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
              <Skeleton className="h-4 w-5/6" />
              <Skeleton className="h-4 w-2/3" />
            </div>
          )}

          {error && (
            <p className="text-sm text-red-500">Error: {error.message}</p>
          )}

          {object && (
            <div className="space-y-4">
              <h1 className="text-xl font-bold">{object.recipe.name}</h1>
              <h2 className="text-lg font-semibold">Ingredients</h2>
              <ul className="list-disc pl-5 space-y-1">
                {object.recipe.ingredients.map((ingredient, index) => (
                  <li key={index} className="text-sm">
                    <span className="font-medium">{ingredient.name}</span> -{" "}
                    {ingredient.amount}
                  </li>
                ))}
              </ul>

              <h2 className="text-lg font-semibold">Steps</h2>
              <ol className="list-decimal pl-5 space-y-2">
                {object.recipe.steps.map((step, index) => (
                  <li key={index} className="text-sm">
                    {step}
                  </li>
                ))}
              </ol>
            </div>
          )}
        </CardContent>
      </Card>

      <Button onClick={() => generate({ prompt })} className="w-full">
        Generate Recipe
      </Button>
    </div>
  );
};

export default Object;
