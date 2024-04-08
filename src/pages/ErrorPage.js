import Banner from '../components/Banner';

export default function ErrorPage(){

	const data = {
		title: "Page not Found",
		content: "The page you are looking cannot be found",
		destination: "/",
		label: "Go back Home"
	}

	return (

		<Banner data={data}/>
	)
}