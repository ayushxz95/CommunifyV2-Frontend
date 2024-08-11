'use client';
import Banner from '@/components/banner';
import Card from '@/components/card';
import Footer from '@/components/footer';
import RevealOnScroll from '@/components/revealOnScroll';

export default function Page() {
  // const count = useSelector((state: RootState) => state.counter.value)
  // const dispatch = useDispatch()
  return (
    <div>
      {/* <Navbar /> */}
      <div className='p-4 lg:p-8'>
        <RevealOnScroll>
          <div className='mt-4'>
            <Banner />
          </div>
        </RevealOnScroll>
        <div className='flex flex-col'>
          <RevealOnScroll>
            <div className='relative flex justify-start scale-75'>
              <Card />
            </div>
          </RevealOnScroll>
          <RevealOnScroll>
            <div className='flex justify-end scale-75'>
              <div className='absolute top-0 -right-4 w-5/12 h-80 bg-green-300 rounded-full mix-blend-multiply filter blur-2xl opacity-70'></div>
              <div className='absolute top-0 right-36 w-5/12 h-80 bg-green-300 rounded-full mix-blend-multiply filter blur-2xl opacity-70'></div>
              <div className='absolute -bottom-8 right-20 w-5/12 h-80 bg-green-100 rounded-full mix-blend-multiply filter blur-2xl opacity-70'></div>
              <div className='relative'>
                <Card />
              </div>
            </div>
          </RevealOnScroll>
          <RevealOnScroll>
            <div className='flex justify-start scale-75'>
              <Card />
            </div>
          </RevealOnScroll>
          <RevealOnScroll>
            <div className='flex justify-end scale-75'>
              <div className='absolute top-0 -right-4 w-5/12 h-80 bg-green-300 rounded-full mix-blend-multiply filter blur-2xl opacity-70'></div>
              <div className='absolute top-0 right-36 w-5/12 h-80 bg-green-300 rounded-full mix-blend-multiply filter blur-2xl opacity-70'></div>
              <div className='absolute -bottom-8 right-20 w-5/12 h-80 bg-green-100 rounded-full mix-blend-multiply filter blur-2xl opacity-70'></div>
              <div className='relative'>
                <Card />
              </div>
            </div>
          </RevealOnScroll>
        </div>
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
}