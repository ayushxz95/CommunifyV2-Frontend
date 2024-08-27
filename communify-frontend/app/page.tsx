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
      <div className='p-4 lg:p-8'>
        <RevealOnScroll>
          <div className='mt-4'>
            <Banner />
          </div>
        </RevealOnScroll>
        <div className='flex flex-col'>
          <RevealOnScroll>
            <div className='relative flex justify-start scale-75'>
              <Card
                key={''}
                postId={''}
                authorName={'John Doe'}
                title={'Where do we use rust ?'}
                isSaved={false}
                isLiked={false}
                mostLikedAnswers={'Rust is a programming language designed to offer memory safety, concurrency, and performance, making it a popular choice for systems programming and other areas where these features are critical.'}
              />
            </div>
          </RevealOnScroll>
          <RevealOnScroll>
            <div className='flex justify-end scale-75'>
              <div className='absolute top-0 -right-4 w-5/12 h-80 bg-green-300 rounded-full mix-blend-multiply filter blur-2xl opacity-70'></div>
              <div className='absolute top-0 right-36 w-5/12 h-80 bg-green-300 rounded-full mix-blend-multiply filter blur-2xl opacity-70'></div>
              <div className='absolute -bottom-8 right-20 w-5/12 h-80 bg-green-100 rounded-full mix-blend-multiply filter blur-2xl opacity-70'></div>
              <div className='relative'>
                <Card
                  key={''}
                  postId={''}
                  authorName={'John Doe'}
                  title={'Where do we use rust ?'}
                  isSaved={false}
                  isLiked={false}
                  mostLikedAnswers={'Rust is a programming language designed to offer memory safety, concurrency, and performance, making it a popular choice for systems programming and other areas where these features are critical.'}
                />
              </div>
            </div>
          </RevealOnScroll>
          <RevealOnScroll>
            <div className='flex justify-start scale-75'>
              <Card
                key={''}
                postId={''}
                authorName={'John Doe'}
                title={'Where do we use rust ?'}
                isSaved={false}
                isLiked={false}
                mostLikedAnswers={'Rust is a programming language designed to offer memory safety, concurrency, and performance, making it a popular choice for systems programming and other areas where these features are critical.'}
              />
            </div>
          </RevealOnScroll>
          <RevealOnScroll>
            <div className='flex justify-end scale-75'>
              <div className='absolute top-0 -right-4 w-5/12 h-80 bg-green-300 rounded-full mix-blend-multiply filter blur-2xl opacity-70'></div>
              <div className='absolute top-0 right-36 w-5/12 h-80 bg-green-300 rounded-full mix-blend-multiply filter blur-2xl opacity-70'></div>
              <div className='absolute -bottom-8 right-20 w-5/12 h-80 bg-green-100 rounded-full mix-blend-multiply filter blur-2xl opacity-70'></div>
              <div className='relative'>
                <Card
                  key={''}
                  postId={''}
                  authorName={'John Doe'}
                  title={'Where do we use rust ?'}
                  isSaved={false}
                  isLiked={false}
                  mostLikedAnswers={'Rust is a programming language designed to offer memory safety, concurrency, and performance, making it a popular choice for systems programming and other areas where these features are critical.'}
                />
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