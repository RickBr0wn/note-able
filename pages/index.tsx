import type { NextPage } from 'next'
import Head from 'next/head'
import { useEffect, useState } from 'react'
import uuid from 'react-uuid'
import TrelloBoard from './trello-board'
import { Text } from '@chakra-ui/react'

export type Columns = {
	[key: string]: {
		name: string
		items: {
			id: string
			content: string
		}[]
	}
}

const Home: NextPage = () => {
	const [columns, setColumns] = useState<Columns>()

	useEffect(() => {
		const itemsFromBackend = [
			{ id: uuid(), content: 'First task' },
			{ id: uuid(), content: 'Second task' },
			{ id: uuid(), content: 'Third task' },
			{ id: uuid(), content: 'Fourth task' },
			{ id: uuid(), content: 'Fifth task' },
			{ id: uuid(), content: 'Sixth task' },
			{ id: uuid(), content: 'Seventh task' },
			{ id: uuid(), content: 'Eighth task' },
			{ id: uuid(), content: 'Ninth task' },
			{ id: uuid(), content: 'Tenth task' }
		]

		const columnsFromBackend = {
			[uuid()]: {
				name: 'Requested',
				items: itemsFromBackend
			},
			[uuid()]: {
				name: 'To do',
				items: []
			},
			[uuid()]: {
				name: 'In progress',
				items: []
			},
			[uuid()]: {
				name: 'Done',
				items: []
			}
		}

		setColumns(columnsFromBackend)
	}, [])

	if (!columns) {
		return <Text>Loading...</Text>
	}

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

			<main>
				<TrelloBoard columnsFromBackend={columns} />
			</main>
		</div>
	)
}

export default Home
