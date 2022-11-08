import type { NextPage } from 'next'
import Head from 'next/head'

const Home: NextPage = () => {
	return (
		<div>
			<Head>
				<title>NOTE-ABLE</title>
				<meta
					name='description'
					content='Note-able is a note taking app that allows you to create, edit, delete and re-order notes.'
				/>
				<link rel='icon' href='/favicon.ico' />
			</Head>

			<main>App</main>
		</div>
	)
}

export default Home
