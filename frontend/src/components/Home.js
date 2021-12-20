
import{
    UncontrolledCarousel
} from 'reactstrap';

function Home() {
  return(
    <UncontrolledCarousel
    items={[
      {
        altText: 'Discover The World With Us',
        caption: 'Discover The World With Us',
        key: 1,
        src: "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/sunset-at-the-pyramids-giza-cairo-egypt-royalty-free-image-1588090066.jpg?crop=1.00xw:0.891xh;0,0.101xh&resize=1200:*",
      },
      {
        altText: 'Discover The World With Us',
        caption: 'Discover The World With Us',
        key: 2,
        src: 'https://travel.saejob.com/wp-content/uploads/2021/04/542RZLPEBFADZDGKFGILSM2BA4.jpg'
      },
      {
        altText: 'Discover The World With Us',
        caption: 'Discover The World With Us',
        key: 3,
        src: 'https://live.staticflickr.com/7610/16800139540_36cf1bde89_b.jpg'
      }
    ]}
   />
  )


}

export default Home;
