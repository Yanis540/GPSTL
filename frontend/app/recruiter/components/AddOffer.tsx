/* eslint-disable @typescript-eslint/no-empty-object-type */
import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';
import { useAddOffer } from '../hooks/use-add-offer';

interface AddOfferProps {

};

function AddOffer({ }: AddOfferProps) {
  const [visible,setIsVisible] = useState<boolean>(false); 
  return (
    <Dialog open={visible} onOpenChange={setIsVisible}>
      <DialogTrigger asChild>
        <Button size="sm" className="h-8 gap-1" >
          <PlusCircle className="h-3.5 w-3.5" />
          <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
            Add an Offer
          </span>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Offer</DialogTitle>
        </DialogHeader>
        <AddOfferForm close={()=>setIsVisible(false)} />
      </DialogContent>
    </Dialog>

  );
};
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Icons } from '@/components/icons';
import { Textarea } from '@/components/ui/textarea';

function AddOfferForm({close}:{close:()=>void}) {
  const handleAddedOffer = (offer:Offer)=>{
    // handle it the way
    console.log(offer);
    close()
  }
  const { isLoading, add, register, errors } = useAddOffer(handleAddedOffer);

  return (
    <div className="flex-1 flex  flex-col items-center justify-center">
      <form onSubmit={add} className="w-full">
        <Card className="w-full border-0 ">
          <CardHeader>
            <CardTitle className="text-2xl">Add your offer</CardTitle>
            <CardDescription>
              Enter your details below
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Title</Label>
                <Input
                  {...register("name")}
                  name="name"
                  placeholder="Full stack web developper"
                  required
                />
                {errors.name && (<h6 className="text-sm font-sm text-red-500">{errors.name.message}</h6>)}
              </div>
              <div className="grid gap-2">
                <Label htmlFor="salary">Monthly salary</Label>
                <Input
                  {...register("salary", {
                    setValueAs: (value) => Number(value),
                  })}
                  name="salary"
                  placeholder="1000"
                  type="number"
                  required
                />
                {errors.salary && (<h6 className="text-sm font-sm text-red-500">{errors.salary.message}</h6>)}
              </div>
              <div className="grid gap-2">
                <Label htmlFor="rhythm">Rhythm</Label>
                <Input
                  {...register("rhythm")}
                  name="rhythm"
                  placeholder="1 day / 4 days"
                  required
                />
                {errors.rhythm && (<h6 className="text-sm font-sm text-red-500">{errors.rhythm.message}</h6>)}
              </div>
              <div className="grid gap-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  {...register("description")}
                  name="description"
                  required
                />
                {errors.description && (<h6 className="text-sm font-sm text-red-500">{errors.description.message}</h6>)}
              </div>
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? <Icons.spinner className="text-background h-6 w-6" /> : "Add"}
              </Button>
            </div>
          </CardContent>
        </Card>
      </form>
    </div>
  )
}

export default AddOffer;