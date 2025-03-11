import { Add } from '@mui/icons-material'
import {
	AppBar,
	Button,
	Container,
	Fab,
	Grid,
	Paper,
	Toolbar,
	Typography,
} from '@mui/material'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import BookCard from '../components/BookCard'
import BookModal from '../components/BookModal'
import { addBook, updateBook } from '../features/bookSlice'

const BookApp = () => {
	const dispatch = useDispatch()
	const { books, filters } = useSelector(state => state.books)
	const [modalOpen, setModalOpen] = useState(false)
	const [editingBook, setEditingBook] = useState(null)

	const filteredBooks = books.filter(book =>
		book.title.toLowerCase().includes(filters.search.toLowerCase())
	)

	return (
		<>
			<AppBar position='static' color='primary' sx={{ boxShadow: 3 }}>
				<Toolbar>
					<Typography
						variant='h5'
						sx={{ flexGrow: 1, fontWeight: 'bold' }}
					>
						📚 My Book Collection
					</Typography>
					<Button
						variant='contained'
						color='secondary'
						startIcon={<Add />}
						onClick={() => setModalOpen(true)}
						sx={{ fontWeight: 'bold' }}
					>
						Add New Book
					</Button>
				</Toolbar>
			</AppBar>

			<Container sx={{ mt: 4 }}>
				<Grid container spacing={3}>
					{filteredBooks.map(book => (
						<Grid item xs={12} sm={6} md={4} lg={3} key={book.id}>
							<Paper
								elevation={4}
								sx={{ borderRadius: 3, overflow: 'hidden' }}
							>
								<BookCard
									book={book}
									onEdit={book => {
										setEditingBook(book)
										setModalOpen(true)
									}}
								/>
							</Paper>
						</Grid>
					))}
				</Grid>
			</Container>

			<Fab
				color='primary'
				aria-label='add'
				sx={{ position: 'fixed', bottom: 16, right: 16 }}
				onClick={() => setModalOpen(true)}
			>
				<Add />
			</Fab>

			<BookModal
				isOpen={modalOpen}
				onClose={() => {
					setModalOpen(false)
					setEditingBook(null)
				}}
				book={editingBook}
				onSubmit={book => {
					editingBook
						? dispatch(updateBook(book))
						: dispatch(addBook(book))
					setModalOpen(false)
				}}
			/>
		</>
	)
}

export default BookApp
