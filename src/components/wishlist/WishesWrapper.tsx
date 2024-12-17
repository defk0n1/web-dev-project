import { Gift } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"



const WishesWrapper = ({children}:any) => {
  return (
<div className="px-4 grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {/* Empty Wish Card */}
        {children}
        <Card className="border-2 border-dashed border-slate-800 bg-slate-900/50 aspect-square flex flex-col items-center justify-center text-gray-400">
          <Gift className="h-12 w-12 mb-4" />
          <Button className="bg-orange-600 hover:bg-orange-700">
            Add Wish
          </Button>
        </Card>
        
        {/* Wish Card */}   
      </div>  )
}

export default WishesWrapper