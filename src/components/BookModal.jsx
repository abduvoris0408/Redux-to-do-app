import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	MenuItem,
	TextField,
} from '@mui/material'
import { useEffect, useState } from 'react'

const BookModal = ({ isOpen, onClose, book, onSubmit }) => {
	const [formData, setFormData] = useState({
		title: '',
		author: '',
		genre: 'fiction',
		pages: '',
	})

	useEffect(() => {
		if (book) {
			setFormData(book)
		} else {
			setFormData({ title: '', author: '', genre: 'fiction', pages: '' })
		}
	}, [book])

	return (
		<Dialog open={isOpen} onClose={onClose} fullWidth maxWidth='sm'>
			<DialogTitle>{book ? 'Edit Book' : 'Add New Book'}</DialogTitle>
			<DialogContent>
				<TextField
					fullWidth
					margin='dense'
					label='Title'
					value={formData.title}
					onChange={e =>
						setFormData({ ...formData, title: e.target.value })
					}
				/>
				<TextField
					fullWidth
					margin='dense'
					label='Author'
					value={formData.author}
					onChange={e =>
						setFormData({ ...formData, author: e.target.value })
					}
				/>
				<TextField
					select
					fullWidth
					margin='dense'
					label='Genre'
					value={formData.genre}
					onChange={e =>
						setFormData({ ...formData, genre: e.target.value })
					}
				>
					<MenuItem value='fiction'>Fiction</MenuItem>
					<MenuItem value='non-fiction'>Non-Fiction</MenuItem>
					<MenuItem value='mystery'>Mystery</MenuItem>
				</TextField>
				<TextField
					fullWidth
					margin='dense'
					label='Pages'
					type='number'
					value={formData.pages}
					onChange={e =>
						setFormData({ ...formData, pages: e.target.value })
					}
				/>
			</DialogContent>
			<DialogActions>
				<Button onClick={onClose} color='secondary' variant='outlined'>
					Cancel
				</Button>
				<Button
					onClick={() => {
						if (!formData.title.trim()) return
						onSubmit({
							...formData,
							id: book?.id || Date.now(),
							completed: book?.completed || false,
						})
						setFormData({
							title: '',
							author: '',
							genre: 'fiction',
							pages: '',
						}) // Formani tozalash
						onClose()
					}}
					color='primary'
					variant='contained'
				>
					{book ? 'Update' : 'Add'}
				</Button>
			</DialogActions>
		</Dialog>
	)
}

export default BookModal
