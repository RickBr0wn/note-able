import { Container, Flex, Text } from '@chakra-ui/react'
import { NextPage } from 'next'
import { Dispatch, SetStateAction, useState } from 'react'
import {
	DragDropContext,
	Draggable,
	Droppable,
	DropResult
} from 'react-beautiful-dnd'
import { Columns } from '.'

type Props = {
	columnsFromBackend: Columns
}

const TrelloBoard: NextPage<Props> = ({ columnsFromBackend }) => {
	const [columns, setColumns] = useState(columnsFromBackend)

	const onDragEnd = (
		result: DropResult,
		columns: Columns,
		setColumns: Dispatch<SetStateAction<Columns>>
	) => {
		if (!result.destination) {
			return
		}

		const { source, destination } = result

		if (source.droppableId !== destination.droppableId) {
			const sourceColumns = columns[source.droppableId]
			const destColumns = columns[destination.droppableId]

			const sourceItems = [...sourceColumns.items]
			const destItems = [...destColumns.items]

			const [removed] = sourceItems.splice(source.index, 1)
			destItems.splice(destination.index, 0, removed)

			setColumns({
				...columns,
				[source.droppableId]: {
					...sourceColumns,
					items: sourceItems
				},
				[destination.droppableId]: {
					...destColumns,
					items: destItems
				}
			})
		} else {
			const column = columns[source.droppableId]
			const copiedItems = [...column.items]
			const [removed] = copiedItems.splice(source.index, 1)

			copiedItems.splice(destination.index, 0, removed)

			setColumns({
				...columns,
				[source.droppableId]: {
					...column,
					items: copiedItems
				}
			})
		}
	}

	console.log(columns)

	return (
		<Container mt={-16} minW={'100vw'} padding={4}>
			<Text fontSize='4xl' mb={4}>
				TrelloBoard
			</Text>
			<DragDropContext
				onDragEnd={result => onDragEnd(result, columns, setColumns)}
			>
				<Flex justify={'space-evenly'}>
					{Object.entries(columns).map(([columnId, column]) => {
						return (
							<Flex id='droppable-area' key={columnId}>
								<Droppable droppableId={columnId}>
									{(provided, snapshot) => {
										return (
											<Flex
												flexDir={'column'}
												{...provided.droppableProps}
												ref={provided.innerRef}
												bgColor={
													snapshot.isDraggingOver ? 'lightblue' : 'lightgrey'
												}
												p={4}
												w={'300px'}
												h={'86vh'}
												shadow={'md'}
											>
												{column.items.map((item, index) => {
													return (
														<Draggable
															key={item.id}
															draggableId={item.id}
															index={index}
														>
															{(provided, snapshot) => {
																return (
																	<Flex
																		ref={provided.innerRef}
																		{...provided.draggableProps}
																		{...provided.dragHandleProps}
																		flexDir={'column'}
																		userSelect={'none'}
																		bgColor={
																			snapshot.isDragging
																				? '#263B4A'
																				: '#456C86'
																		}
																		color={'white'}
																		p={4}
																		m={'0 0 8px 0'}
																		minH={'100px'}
																		sx={{
																			...provided.draggableProps.style
																		}}
																	>
																		<Text fontSize={'md'}>{item.content}</Text>
																		<Text fontSize={'x-small'}>{item.id}</Text>
																	</Flex>
																)
															}}
														</Draggable>
													)
												})}
												{provided.placeholder}
											</Flex>
										)
									}}
								</Droppable>
							</Flex>
						)
					})}
				</Flex>
			</DragDropContext>
		</Container>
	)
}

export default TrelloBoard

// Path: pages/trello-board.tsx
