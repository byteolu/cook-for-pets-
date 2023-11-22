import Image from 'next/image'
import ImgCaption from './components/ImgCaption'
import NavBar from '@/components/NavBar';

export default function Home() {
  return (
    <div>
      <NavBar />
      <ImgCaption />
    </div>
  );
}
