import {
  Carousel,
  CarouselContent,
  CarouselIndicators,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'

const slides = ['bg-tag-blue-bg', 'bg-tag-purple-bg', 'bg-tag-green-bg', 'bg-tag-orange-bg', 'bg-tag-pink-bg']

export default function CarouselDemo() {
  return (
    <Carousel slideCount={slides.length} className="w-80">
      <CarouselContent>
        {slides.map((bg, index) => (
          <CarouselItem key={bg} index={index}>
            <div className={`flex aspect-video items-center justify-center rounded-lg text-3xl font-semibold ${bg}`}>
              {index + 1}
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
      <CarouselIndicators />
    </Carousel>
  )
}
