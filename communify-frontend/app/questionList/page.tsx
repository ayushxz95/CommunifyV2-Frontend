import Footer from '@/components/footer'
import QuestionCard from '@/components/questionCard'

export default function QuestionList() {
  return (
    <div>
      {/* <Navbar/> */}
      <div className='flex flex-col gap-8 mt-4 px-4 lg:px-0'>
        <QuestionCard />
        <QuestionCard />
        <QuestionCard />
        <QuestionCard />
      </div>
      <Footer />
    </div>
  )
}
