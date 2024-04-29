import React, { useState, useEffect } from 'react'
import { GoHomeFill } from "react-icons/go";
import { FiSearch } from "react-icons/fi";
import { BiLibrary } from "react-icons/bi";
import { GoPlus } from "react-icons/go";
import { GoArrowRight } from "react-icons/go";
import { MdKeyboardArrowRight, MdKeyboardArrowLeft } from "react-icons/md";
import { IoIosPlay } from "react-icons/io";
import { GoBell } from "react-icons/go";
import { FaInstagram, FaFacebook, FaTwitter } from "react-icons/fa";
import { initializeApp } from 'firebase/app';
import { getStorage, ref, getDownloadURL } from 'firebase/storage';
import { debounce } from 'lodash';
import './App.css'

function App() {

  const firebaseConfig = {
    apiKey: "AIzaSyDLzw6xrNUR1nTy96_ednxtEFxzAf5nb8U",
    authDomain: "qirats-5607a.firebaseapp.com",
    projectId: "qirats-5607a",
    storageBucket: "qirats-5607a.appspot.com",
    messagingSenderId: "50194753884",
    appId: "1:50194753884:web:08dc2767599cf543dfb999",
    measurementId: "G-9M4B80G70X"
  };

  // ------------- //
  // --- Audio --- //
  // ------------- //

  const [isPlaying, setIsPlaying] = useState(false)

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);

  // Get a reference to the Firebase Storage service
  const storage = getStorage(app);

  const handlePlay = debounce(async (url) => {

    if (isPlaying)
      return

    const audioRef = ref(storage, url);

    // Get the download URL of the audio file
    const downloadURL = await getDownloadURL(audioRef);

    // Create an audio element and play the audio
    const audio = new Audio(downloadURL);
    audio.play();
    setIsPlaying(true)

    // Don't let the Audio be played twice
    audio.addEventListener('ended', () => {
      setIsPlaying(false)
    })
  }, 300)

  return (
    <>
      <div className="main flex flex-row">
        <div className="left flex flex-col w-1/3 fixed">
          <div className="view flex flex-col gap-6 bg-[#121212] rounded-lg m-2 h-28">
            <div className="option flex flex-row gap-5 items-center align-middle w-1/2 text-base font-bold mt-4 ml-5 cursor-pointer">
              <GoHomeFill className='size-7' />
              <span>Home</span>
            </div>

            <div className="option flex flex-row gap-5 items-center align-middle w-1/2 text-base ml-6 text-neutral-400 hover:text-white cursor-pointer">
              <FiSearch className='size-6' />
              <span>Search</span>
            </div>
          </div>

          <div className="library flex flex-col gap-6 bg-[#121212] rounded-lg mx-2 h-96">
            <div className="heading flex flex-row items-center align-middle justify-between text-neutral-400 text-base mt-4 ml-5">
              <div className='flex flex-row items-center align-middle gap-4 cursor-pointer hover:text-white'>
                <BiLibrary className='size-8' />
                <span>Your Library</span>
              </div>

              <div className='flex flex-row items-center align-middle gap-3 mr-6'>
                <GoPlus className='size-8 cursor-pointer hover:text-white hover:bg-neutral-800 rounded-full p-1' />
                <GoArrowRight className='size-8 cursor-pointer hover:text-white hover:bg-neutral-800 rounded-full p-1' />
              </div>
            </div>

            <div className="box flex flex-col gap-2 bg-[#242424] rounded-lg mx-2 p-4">
              <span className='font-semibold'>Create your first playlist</span>
              <span className='text-sm'>It's easy, we'll help you</span>
              <button className='bg-white text-black justify-center items-center align-middle text-sm py-1.5 font-bold mt-3 rounded-full w-2/5 hover:bg-neutral-300'>Create playlist</button>
            </div>

            <div className="box flex flex-col gap-2 bg-[#242424] rounded-lg mx-2 p-4">
              <span className='font-semibold'>Let's find some podcasts to follow</span>
              <span className='text-sm'>We'll keep you updated on new epidodes</span>
              <button className='bg-white text-black justify-center items-center align-middle text-sm py-1.5 font-bold mt-3 rounded-full w-2/5 hover:bg-neutral-300'>Browse podcasts</button>
            </div>
          </div>
        </div>

        <div className="right flex flex-col w-2/3 my-2 mr-4 ml-[33.5%] rounded-lg">
          <div className="navBar flex flex-row justify-between">
            <div className="arrows flex flex-row gap-2 items-center align-middle m-4">
              <MdKeyboardArrowLeft className='size-9 cursor-pointer bg-neutral-900 text-neutral-300  hover:invert rounded-full p-1' />
              <MdKeyboardArrowRight className='size-9 cursor-pointer bg-neutral-900 text-neutral-300 hover:invert rounded-full p-1' />
            </div>

            <div className="others flex flex-row gap-2 mt-3 mr-5">
              <button className='bg-white text-black px-5 py-2 size-fit justify-center items-center align-middle text-sm font-bold rounded-full hover:bg-neutral-300'>Explore Premium</button>
              <button className='bg-neutral-950 text-neutral-300 px-4 py-2 size-fit justify-center items-center align-middle text-sm font-bold rounded-full hover:text-white'>Install App</button>
              <GoBell className='size-9 cursor-pointer bg-neutral-950 text-neutral-300 hover:text-white  rounded-full p-2' />
              <div className='bg-[#b49bc8] text-black font-semibold flex size-9 text-center items-center justify-center align-middle rounded-full cursor-pointer'>A</div>
            </div>
          </div>

          <div className="btns flex flex-row gap-2 ml-4">
            <button className='bg-neutral-950 text-white px-3 py-2 size-fit justify-center items-center align-middle text-sm rounded-full hover:bg-neutral-900'>All</button>
            <button className='bg-white text-black px-3 py-2 size-fit justify-center items-center align-middle text-sm font-bold rounded-full hover:bg-neutral-300'>Qirats</button>
          </div>

          <div className="melodies flex flex-row flex-wrap h-full gap-7 mt-3 ml-3">
            <div className="melody relative flex flex-col flex-shrink-0 w-[22%] h-1/3 p-3 hover:bg-neutral-950 cursor-default group">
              <div className='flex flex-row w-full items-center'>
                <img src="https://static.vecteezy.com/system/resources/previews/023/581/681/original/al-rahman-is-the-name-of-allah-99-names-of-allah-al-asma-al-husna-arabic-islamic-calligraphy-art-on-canvas-for-wall-art-logo-and-decoration-al-rahman-arabic-calligraphy-gold-color-vector.jpg" alt="" className='invert rounded-lg' />
              </div>

              <IoIosPlay onClick={() => handlePlay('https://firebasestorage.googleapis.com/v0/b/qirats-5607a.appspot.com/o/Surah%20Rahman%20-%20Mishary%20Rashid%20Al%20Afasy%20%D8%B3%D9%88%D8%B1%D8%A9%20%D8%A7%D9%84%D8%B1%D8%AD%D9%85%D9%86%20-%20%D9%85%D8%B4%D8%A7%D8%B1%D9%8A%20%D8%A7%D9%84%D8%B9%D9%81%D8%A7%D8%B3%D9%8A%20(256%20%20kbps)%20(ss.shabakngy.com).mp3?alt=media&token=f4f8a640-8de1-4c33-ab20-71bcc2eee63d')} className='bg-green-500 cursor-pointer transition-all duration-200 text-black rounded-full p-1.5 size-9 absolute right-[10%] top-[45.5%] hover:size-10 hover:right-[9%] hover:top-[44.75%] hidden group-hover:inline' />

              <span className='mt-2'>Surah Rahman</span>
              <span className='text-sm text-neutral-400 line-clamp-2'>The 55th chapter of the Quran is renowned for its repeated refrain "Which of the favors of your Lord would you deny?".</span>
            </div>

            <div className="melody relative flex flex-col flex-shrink-0 w-[22%] h-1/3 p-3 hover:bg-neutral-950 cursor-default group">
              <div className='flex flex-row w-full items-center'>
                <img src="https://miro.medium.com/v2/resize:fit:1000/1*79ZZUuTnhSJ2Cu9708Gu6A.jpeg" alt="" className='rounded-lg h-40' />
              </div>

              <IoIosPlay onClick={() => handlePlay('https://firebasestorage.googleapis.com/v0/b/qirats-5607a.appspot.com/o/Surah-Yasin.mp3?alt=media&token=5d3c9c5f-9524-4169-a37c-8fa2b77cbc06')} className='bg-green-500 cursor-pointer transition-all duration-200 text-black rounded-full p-1.5 size-9 absolute right-[10%] top-[45.5%] hover:size-10 hover:right-[9%] hover:top-[44.75%] hidden group-hover:inline' />

              <span className='mt-2'>Surah Yasin</span>
              <span className='text-sm text-neutral-400 line-clamp-2'>The 36th chapter of the Quran describes the oneness of Allah (Tawheed). The surah highlights the signs in the natural world as evidence of God's existence and attributes, encouraging reflection on the divine unity.</span>
            </div>

            <div className="melody relative flex flex-col flex-shrink-0 w-[22%] h-1/3 p-3 hover:bg-neutral-950 cursor-default group">
              <div className='flex flex-row w-full items-center'>
                <img src="https://quranforkids.com/wp-content/uploads/2024/02/Golden-Black-Islamic-Ramadan-Kareem-Instagram-Post-1-768x768.png" alt="" className='rounded-lg h-40' />
              </div>

              <IoIosPlay onClick={() => handlePlay('https://firebasestorage.googleapis.com/v0/b/qirats-5607a.appspot.com/o/Surah-Waqiah.mp3?alt=media&token=0605b158-e198-4eee-9978-fec2aeeded98')} className='bg-green-500 cursor-pointer transition-all duration-200 text-black rounded-full p-1.5 size-9 absolute right-[10%] top-[45.5%] hover:size-10 hover:right-[9%] hover:top-[44.75%] hidden group-hover:inline' />

              <span className='mt-2'>Surah Waqiyah</span>
              <span className='text-sm text-neutral-400 line-clamp-2'>The 56th chapter of the Quran, vividly describes the scenes of the Day of Judgment, emphasizing the certainty of its occurrence and the division of humanity into three distinct groups: the foremost, the companions of the right, and the companions of the left.</span>
            </div>

            <div className="melody relative flex flex-col flex-shrink-0 w-[22%] h-1/3 p-3 hover:bg-neutral-950 cursor-default group">
              <div className='flex flex-row w-full items-center'>
                <img src="https://www.irfan-ul-quran.com/images/sura/Al-Kahf_18.jpg" alt="" className='rounded-lg h-40' />
              </div>

              <IoIosPlay onClick={() => handlePlay('https://firebasestorage.googleapis.com/v0/b/qirats-5607a.appspot.com/o/Surah-Kahf.mp3?alt=media&token=886fa6e0-192c-4f1c-8f74-d1f117d1a590')} className='bg-green-500 cursor-pointer transition-all duration-200 text-black rounded-full p-1.5 size-9 absolute right-[10%] top-[45.5%] hover:size-10 hover:right-[9%] hover:top-[44.75%] hidden group-hover:inline' />

              <span className='mt-2'>Surah Al-Kahf</span>
              <span className='text-sm text-neutral-400 line-clamp-2'>The 18th chapter of the Quran, contains narratives that illustrate lessons about faith, resilience, and divine wisdom, encouraging believers to seek knowledge and guidance.</span>
            </div>

            <div className="melody relative flex flex-col flex-shrink-0 w-[22%] h-1/3 p-3 hover:bg-neutral-950 cursor-default group">
              <div className='flex flex-row w-full items-center'>
                <img src="https://www.irfan-ul-quran.com/images/sura/Al-Fath_48.jpg" alt="" className='rounded-lg h-40' />
              </div>

              <IoIosPlay onClick={() => handlePlay('https://firebasestorage.googleapis.com/v0/b/qirats-5607a.appspot.com/o/Surah-Fath.mp3?alt=media&token=970a1c9b-cef7-4369-afe9-7ba687f0ddf8')} className='bg-green-500 cursor-pointer transition-all duration-200 text-black rounded-full p-1.5 size-9 absolute right-[10%] top-[45.5%] hover:size-10 hover:right-[9%] hover:top-[44.75%] hidden group-hover:inline' />

              <span className='mt-2'>Surah Al-Fath</span>
              <span className='text-sm text-neutral-400 line-clamp-2'>The 48th chapter of the Quran, celebrates the victory granted by Allah to the Prophet Muhammad and his followers, signifying the triumph of truth over falsehood.</span>
            </div>

            <div className="melody relative flex flex-col flex-shrink-0 w-[22%] h-1/3 p-3 hover:bg-neutral-950 cursor-default group">
              <div className='flex flex-row w-full items-center'>
                <img src="https://www.arabiantongue.com/wp-content/uploads/2023/10/1e35a399-3214-4127-acf8-93de17e1c506.jpg" alt="" className='rounded-lg h-40' />
              </div>

              <IoIosPlay onClick={() => handlePlay('https://firebasestorage.googleapis.com/v0/b/qirats-5607a.appspot.com/o/Surah-Baqarah.mp3?alt=media&token=8da270cb-67af-426a-bd9b-258eab00434b')} className='bg-green-500 cursor-pointer transition-all duration-200 text-black rounded-full p-1.5 size-9 absolute right-[10%] top-[45.5%] hover:size-10 hover:right-[9%] hover:top-[44.75%] hidden group-hover:inline' />

              <span className='mt-2'>Surah Baqarah</span>
              <span className='text-sm text-neutral-400 line-clamp-2'>The 2nd chapter of the Quran, is the longest chapter and covers various aspects of faith, law, and guidance for humanity, serving as a comprehensive guide for righteous living.</span>
            </div>

            <div className="melody relative flex flex-col flex-shrink-0 w-[22%] h-1/3 p-3 hover:bg-neutral-950 cursor-default group">
              <div className='flex flex-row w-full items-center'>
                <img src="https://orientaleboutiques.com/cdn/shop/products/ctis-192ihlassuresi5yakin.jpg?v=1693091884&width=1445" alt="" className='rounded-lg h-40' />
              </div>

              <IoIosPlay onClick={() => handlePlay('https://firebasestorage.googleapis.com/v0/b/qirats-5607a.appspot.com/o/Surah-Ikhlas.mp3?alt=media&token=35be9513-7683-4060-8046-e52b13ed9f0f')} className='bg-green-500 cursor-pointer transition-all duration-200 text-black rounded-full p-1.5 size-9 absolute right-[10%] top-[45.5%] hover:size-10 hover:right-[9%] hover:top-[44.75%] hidden group-hover:inline' />

              <span className='mt-2'>Surah Ikhlas</span>
              <span className='text-sm text-neutral-400 line-clamp-2'>The 112th chapter of the Quran, succinctly expresses the concept of the Oneness of Allah, emphasizing His absolute uniqueness and indivisibility.</span>
            </div>

            <div className="melody relative flex flex-col flex-shrink-0 w-[22%] h-1/3 p-3 hover:bg-neutral-950 cursor-default group">
              <div className='flex flex-row w-full items-center'>
                <img src="https://allonlineislam.com/wp-content/uploads/2023/09/Surah-Al-Kafirun-Transliteration.jpg" alt="" className='rounded-lg h-40' />
              </div>

              <IoIosPlay onClick={() => handlePlay('https://firebasestorage.googleapis.com/v0/b/qirats-5607a.appspot.com/o/Surah-Qafirun.mp3?alt=media&token=64be7bb0-e98c-4094-89c7-1670a4285967')} className='bg-green-500 cursor-pointer transition-all duration-200 text-black rounded-full p-1.5 size-9 absolute right-[10%] top-[45.5%] hover:size-10 hover:right-[9%] hover:top-[44.75%] hidden group-hover:inline' />

              <span className='mt-2'>Surah Qafirun</span>
              <span className='text-sm text-neutral-400 line-clamp-2'>The 109th chapter of the Quran, asserts the rejection of polytheism and the firm stance of believers in their faith.</span>
            </div>

            <div className="melody relative flex flex-col flex-shrink-0 w-[22%] h-1/3 p-3 hover:bg-neutral-950 cursor-default group">
              <div className='flex flex-row w-full items-center'>
                <img src="https://allonlineislam.com/wp-content/uploads/2023/09/Surah-Nas-Translation-In-English.jpg" alt="" className='rounded-lg h-40' />
              </div>

              <IoIosPlay onClick={() => handlePlay('https://firebasestorage.googleapis.com/v0/b/qirats-5607a.appspot.com/o/Surah-Nas.mp3?alt=media&token=a60a8ce1-dcfb-4a2a-ba6d-051d14cd3f9f')} className='bg-green-500 cursor-pointer transition-all duration-200 text-black rounded-full p-1.5 size-9 absolute right-[10%] top-[45.5%] hover:size-10 hover:right-[9%] hover:top-[44.75%] hidden group-hover:inline' />

              <span className='mt-2'>Surah Nas</span>
              <span className='text-sm text-neutral-400 line-clamp-2'>The 114th chapter of the Quran, preaches seeking refuge in Allah from the whispers of the evil whisperer, emphasizing reliance on the Almighty for protection against harmful influences.</span>
            </div>

            <div className="melody relative flex flex-col flex-shrink-0 w-[22%] h-1/3 p-3 hover:bg-neutral-950 cursor-default group">
              <div className='flex flex-row w-full items-center'>
                <img src="https://quranichub.org/wp-content/uploads/elementor/thumbs/113-qeq3oip7qi4wbtrrviwlyqqwqj7511qz3sww3n0v0g.jpeg" alt="" className='rounded-lg h-40' />
              </div>

              <IoIosPlay onClick={() => handlePlay('https://firebasestorage.googleapis.com/v0/b/qirats-5607a.appspot.com/o/Surah-Falaq.mp3?alt=media&token=8dda1c41-bc9e-4080-ac77-46f376023292')} className='bg-green-500 cursor-pointer transition-all duration-200 text-black rounded-full p-1.5 size-9 absolute right-[10%] top-[45.5%] hover:size-10 hover:right-[9%] hover:top-[44.75%] hidden group-hover:inline' />

              <span className='mt-2'>Surah Falaq</span>
              <span className='text-sm text-neutral-400 line-clamp-2'>The 113th chapter of the Quran, seeks refuge from the evil of all creatures of the night, highlighting the need for protection and guidance from Allah against unseen dangers.</span>
            </div>
          </div>

          <div className="footer text-neutral-400 flex flex-row gap-20 mx-6 mt-36">
            <div className="col flex flex-col w-1/4 gap-2">
              <span className="heading text-white text-base font-semibold">Company</span>
              <span className='hover:text-white cursor-pointer text-sm'>About</span>
              <span className='hover:text-white cursor-pointer text-sm'>Jobs</span>
              <span className='hover:text-white cursor-pointer text-sm'>The Record</span>
            </div>

            <div className="col flex flex-col w-1/4 gap-2">
              <span className="heading text-white text-base font-semibold">Communities</span>
              <span className='hover:text-white cursor-pointer text-sm'>For Artists</span>
              <span className='hover:text-white cursor-pointer text-sm'>Developers</span>
              <span className='hover:text-white cursor-pointer text-sm'>Advertising</span>
              <span className='hover:text-white cursor-pointer text-sm'>Investors</span>
              <span className='hover:text-white cursor-pointer text-sm'>Vendors</span>
            </div>

            <div className="col flex flex-col w-1/4 gap-2">
              <span className="heading text-white text-base font-semibold">Useful Links</span>
              <span className='hover:text-white cursor-pointer text-sm'>Support</span>
              <span className='hover:text-white cursor-pointer text-sm'>Mobile App</span>
            </div>

            <div className="col flex flex-col w-1/4 gap-2">
              <span className="heading text-white text-base font-semibold">Spotify Plans</span>
              <span className='hover:text-white cursor-pointer text-sm'>Individual</span>
              <span className='hover:text-white cursor-pointer text-sm'>Duo</span>
              <span className='hover:text-white cursor-pointer text-sm'>Family</span>
              <span className='hover:text-white cursor-pointer text-sm'>Student</span>
              <span className='hover:text-white cursor-pointer text-sm'>Spotify Free</span>
            </div>

            <div className="col flex flex-col gap-3">
              <FaInstagram className='size-8 bg-neutral-700 rounded-full text-white p-1.5 cursor-pointer hover:bg-neutral-600' />
              <FaFacebook className='size-8 bg-neutral-700 rounded-full text-white p-1.5 cursor-pointer hover:bg-neutral-600' />
              <FaTwitter className='size-8 bg-neutral-700 rounded-full text-white p-1.5 cursor-pointer hover:bg-neutral-600' />
            </div>
          </div>

          <div className='flex flex-col justify-center items-center align-middle mt-10'>
            <div className="footer w-[94%] h-[1px] bg-neutral-600"></div>
          </div>

          <div className="footer text-sm text-neutral-400 mx-6 mt-10 mb-20">&copy; 2024 Spotify</div>
        </div>
      </div>
    </>
  )
}

export default App