import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';


// import required modules
import { Autoplay, Pagination, Navigation } from 'swiper/modules';//only we have to insert data into slider and styling or position 
import Course_Card from './Course_Card'


const CourseSlider = ({Courses}) => { 

  return (
    <>
      {Courses?.length ? (
        <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        breakpoints={{
          1024:{slidesPerView : 3,}
        }}
        className="mySwiper max-h-[30rem]"
      >
          {Courses?.map((course, i) => (
            <SwiperSlide key = {i}>
              <Course_Card course={course} Height={"h-[250px]"} />
            </SwiperSlide>
          ))}
        </Swiper>
            ) : ( <p className="text-xl text-richblack-5">No Course Found</p> )
         
       }
    </>
  
)}


export default CourseSlider
