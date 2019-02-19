import React from 'react';

import NewsSlider from '../widgets/NewsSlider/sldier';
import NewsList from '../widgets/NewsList/newsList'
import VideosList from '../widgets/VideosList/videosList';


const Home = () => {
	return(
		<div>
		 	<NewsSlider
			 		type="featured"
					start={0}
					amount={6}
					settings={{
						dots: false
					}}
			 />
			 <NewsList
					type="card"
					loadMore={true}
					start={3}
					amount={3}
			 />
			 <VideosList
					type="card"
					title={true}
					loadMore={true}
					start={0}
					amount={3}
			 />
		</div>
	)
}

export default Home;