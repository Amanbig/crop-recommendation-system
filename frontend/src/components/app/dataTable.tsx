"use client";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { DatasetTypes } from "@/types/data"
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import axios from "axios";
import { Badge } from "../ui/badge";



export function DataTable() {
  
  const [page,setPage] = useState<number>(1)
  const [dataset, setDataset] = useState<DatasetTypes[]>([]);
  
  async function fetchDataset() {
    const response = await axios.get(`http://localhost:8000/data?page=${page}&size=100`);
    if (!response) {
      throw new Error("Failed to fetch dataset");
    }
    console.log(response.data)
    const data: DatasetTypes[] = await response.data.data;
    setDataset(prev=> [...prev, ...data]);
  }
  
  useEffect(() => {
    fetchDataset();
  }, [page]);
  
  
  return (
    <>
      <Badge className="text-sm mb-5">This is the dataset used for training model</Badge>
    <Table>
      {/* <TableCaption>This is the dataset on which its trained.</TableCaption> */}
      <TableHeader className="dark:border-b-white border-b-black border-b-2">
        <TableRow>
          <TableHead  className="text-left">Nitrogen</TableHead>
          <TableHead className="text-left">Phosphorous</TableHead>
          <TableHead className="text-left">Potassium</TableHead>
          <TableHead className="text-left">Temperature</TableHead>
          <TableHead className="text-left">Humidity</TableHead>
          <TableHead className="text-left">Ph</TableHead>
          <TableHead className="text-left">Label</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {dataset.map((data) => (
          <TableRow key={`${data.N}-${data.P}-${data.K}`}>
            <TableCell  className="text-left">{data.N}</TableCell>
            <TableCell  className="text-left">{data.P}</TableCell>
            <TableCell  className="text-left">{data.K}</TableCell>
            <TableCell  className="text-left">{data.temperature}</TableCell>
            <TableCell  className="text-left">{data.humidity}</TableCell>
            <TableCell  className="text-left">{data.ph}</TableCell>
            <TableCell  className="text-left">{data.label}</TableCell>
          </TableRow>
        ))}
      </TableBody>
      {/* <TableFooter>
        <TableRow>
          <TableCell colSpan={3}>Total</TableCell>
          <TableCell className="text-right">$2,500.00</TableCell>
        </TableRow>
      </TableFooter> */}
    </Table>
    <div className="w-full justify-center text-center pt-4">
      
    <Button onClick={()=>setPage(prev=>prev+1)}>Load More</Button>
    </div>
    </>
  )
}
