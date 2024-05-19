import Card from '@/components/card'
import Footer from '@/components/footer'
import Navbar from '@/components/navBar'
import QuestionCard from '@/components/questionCard'
import React from 'react'

export default function QuestionList() {
  return (
    <div>
        <Navbar/>
    <div className='flex flex-col gap-8 mt-4 px-4 lg:px-0'>
        <QuestionCard/>
        <QuestionCard/>
        <QuestionCard/>
        <QuestionCard/>
    </div>
    <Footer/>
    </div>
  )
}
