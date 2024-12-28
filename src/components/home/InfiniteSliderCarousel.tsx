'use client'

import * as React from 'react'
import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import Autoplay from "embla-carousel-autoplay"
import useEmblaCarousel from 'embla-carousel-react'
import { BrandImage } from '@/lib/types'

import Image from 'next/image'


const InfiniteSliderCarousel = ({ items }: { items: BrandImage[] }) => {
  const [emblaRef] = useEmblaCarousel({ loop: true, align: 'start' }, [
    Autoplay({ delay: 3000, stopOnInteraction: false })
  ])

  return (
    <div className="w-full max-w-5xl mx-auto px-4">
      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        plugins={[
          Autoplay({
            delay: 3000,
          }),
        ]}
        className="w-full"
      >
        <CarouselContent className="-ml-2 md:-ml-4">
            {items.map((item) => (
                <CarouselItem key={item.id} className="pl-2 md:pl-4 md:basis-1/3">
                    <div className="p-1">
                        <Card>
                            <CardContent className="flex aspect-square items-center justify-center p-6">
                                {/* <span className="text-3xl font-semibold">{item.name}</span> */}
                                <Image src={`/images/${item.id}.png`} alt={item.name} width={200} height={200} />
                                
                            </CardContent>
                        </Card>
                    </div>
                </CarouselItem>
))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  )
}



export default InfiniteSliderCarousel;
