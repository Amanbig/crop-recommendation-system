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
    <Table>
      {/* <TableCaption>This is the dataset on which its trained.</TableCaption> */}
      <TableHeader>
        <TableRow>
          <TableHead>Nitrogen</TableHead>
          <TableHead>Phosphorous</TableHead>
          <TableHead>Potassium</TableHead>
          <TableHead>Temperature</TableHead>
          <TableHead>Humidity</TableHead>
          <TableHead>Ph</TableHead>
          <TableHead>Label</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {dataset.map((data) => (
          <TableRow key={`${data.N}-${data.P}-${data.K}`}>
            <TableCell>{data.N}</TableCell>
            <TableCell>{data.P}</TableCell>
            <TableCell>{data.K}</TableCell>
            <TableCell>{data.temperature}</TableCell>
            <TableCell>{data.humidity}</TableCell>
            <TableCell>{data.ph}</TableCell>
            <TableCell>{data.label}</TableCell>
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
