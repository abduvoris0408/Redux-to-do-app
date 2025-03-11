import { Button, Card, CardContent, Typography } from '@mui/material'
import { useDispatch } from 'react-redux'
import { deleteBook, toggleStatus } from '../features/bookSlice'

const BookCard = ({ book, onEdit }) => {
	const dispatch = useDispatch()

	return (
		<Card
			sx={{
				maxWidth: 600,
				width: '100%',
				p: 4,
				boxShadow: 3,
				borderRadius: 3,
			}}
		>
			<CardContent>
				<Typography
					variant='h5'
					component='div'
					sx={{
						textDecoration: book.completed
							? 'line-through'
							: 'none',
						fontWeight: 'bold',
					}}
				>
					{book.title}
				</Typography>
				<Typography
					variant='subtitle1'
					color='text.secondary'
					sx={{ mb: 1 }}
				>
					by {book.author}
				</Typography>
				<Typography variant='body2' color='text.secondary'>
					<strong>Janr:</strong> {book.genre}
				</Typography>
				<Typography variant='body2' color='text.secondary'>
					<strong>Sahifalar:</strong> {book.pages}
				</Typography>
			</CardContent>

			<Button
				variant='contained'
				color={book.completed ? 'secondary' : 'success'}
				size='small'
				sx={{ borderRadius: 2 }}
				onClick={() => dispatch(toggleStatus(book.id))}
			>
				{book.completed ? 'O‘qilmagan' : 'O‘qilgan'}
			</Button>
			<Button
				variant='contained'
				color='primary'
				size='small'
				sx={{ borderRadius: 2 }}
				onClick={() => onEdit(book)}
			>
				Tahrirlash
			</Button>
			<Button
				variant='contained'
				color='error'
				size='small'
				sx={{ borderRadius: 2 }}
				onClick={() => dispatch(deleteBook(book.id))}
			>
				O‘chirish
			</Button>
		</Card>
	)
}

export default BookCard
