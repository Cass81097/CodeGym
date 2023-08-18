import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import DeleteIcon from '@mui/icons-material/Delete'
import SendIcon from '@mui/icons-material/Send'
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';


export default function Mui() {
    return (
        <>
            <div className="App">
                <Box mt={5}>
                    <Typography variant='h1' gutterBottom>MUI-5 App</Typography>
                    <Typography variant='h3' align='center' gutterBottom>This is a App using MUI-5</Typography>
                    <Typography variant='subtitle1' align='justify' mt={5}>
                        This works great when the changes can be isolated to a new DOM element. For instance, you can change the margin this way.

                        However, sometimes you have to target the underlying DOM element. As an example, you may want to change the border of the Button. The Button component defines its own styles. CSS inheritance doesn't help. To workaround the problem, you can use the sx prop directly on the child if it is a Material UI component.
                    </Typography>
                </Box>
                <Stack direction='row' spacing={5} paddingTop={15} paddingLeft={50}>
                    <Button variant="text">Click Me</Button>
                    <Button variant="contained">Submit</Button>
                    <Button variant="outlined">Sign In</Button>
                    <Button disabled>Disabled</Button>
                    <Button variant='outlined' startIcon={<DeleteIcon />}
                    >Delete</Button>
                    <Button variant='outlined' startIcon={<SendIcon />}
                    >Send</Button>
                </Stack>
            </div>
        </>
    )
}