import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { Paw } from 'lucide-react';

const fetchCatFact = async () => {
  const response = await fetch('https://catfact.ninja/fact');
  if (!response.ok) {
    throw new Error('Failed to fetch cat fact');
  }
  return response.json();
};

const CatFactCard = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['catFact'],
    queryFn: fetchCatFact,
  });

  if (isLoading) return <Skeleton className="h-[100px] w-full" />;
  if (error) return <p>Error loading cat fact</p>;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Paw className="mr-2 h-4 w-4" />
          Cat Fact
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p>{data.fact}</p>
      </CardContent>
    </Card>
  );
};

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-100 to-pink-100 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center text-purple-800">All About Cats</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Fascinating Felines</CardTitle>
            </CardHeader>
            <CardContent>
              <img src="https://placekitten.com/400/300" alt="Cute cat" className="w-full h-48 object-cover rounded-md mb-4" />
              <p>Cats are one of the most popular pets in the world, known for their independence, playfulness, and affectionate nature.</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Cat Breeds</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc pl-5 space-y-2">
                <li>Siamese</li>
                <li>Persian</li>
                <li>Maine Coon</li>
                <li>Bengal</li>
                <li>Scottish Fold</li>
              </ul>
            </CardContent>
          </Card>
        </div>
        
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-purple-700">Cat Characteristics</h2>
          <div className="flex flex-wrap gap-2">
            <Badge variant="secondary">Agile</Badge>
            <Badge variant="secondary">Curious</Badge>
            <Badge variant="secondary">Independent</Badge>
            <Badge variant="secondary">Playful</Badge>
            <Badge variant="secondary">Affectionate</Badge>
          </div>
        </div>
        
        <CatFactCard />
      </div>
    </div>
  );
};

export default Index;