"use client"

import React, { useEffect, useState } from "react"

import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import axios from "axios";

export function LableCorousal() {
  
  const [labels, setLabels] = useState([]);
  
  async function fetchLabels() {
    const response = await axios.get("http://localhost:8000/labels");
    if (!response) {
      throw new Error("Failed to fetch labels");
    }
    const data = await response.data;
    // console.log(data);
    setLabels(data);
  }
  
  useEffect(()=>{
    fetchLabels();
  },[])
  
  return (
    <Carousel
      opts={{
        align: "center",
      }}
      className="w-full max-w-sm"
    >
      <CarouselContent>
        {labels.map((label, index) => (
          <CarouselItem key={index} className="">
            <div className="p-1">
              <Card>
                <CardContent className="flex aspect-square items-center justify-center p-6">
                  <span className="text-3xl font-semibold">{label}</span>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  )
}
