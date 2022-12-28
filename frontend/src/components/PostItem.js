import * as React from 'react';
import Typography from '@mui/material/Typography';


import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';

const trim = (content, limit) => {
    const length = content.length;
    if (content.indexOf("\n") !== -1)
        content = content.substring(0, content.indexOf('\n'));

    if (length <= limit)
        return content;

    content = content.substring(0, limit);
    return content + " ...";
}

/* Ref. https://github.com/mui/material-ui/blob/v5.11.2/docs/data/material/getting-started/templates/blog/FeaturedPost.js */
const PostItem = ({ post, onClick}) => {
	let { title, username, nickname, content } = post

	content = trim(content, 40);

	return (
		<Grid item xs={7}>
			<CardActionArea onClick={onClick}>
				<Card sx={{ display: 'flex' }}>
					<CardContent sx={{ flex: 1 }}>
						<Typography component="h2" variant="h5">
							{title}
						</Typography>
						<Typography variant="subtitle1" color="text.secondary">
							{`${nickname} @${username}`}
						</Typography>
						<Typography variant="subtitle1" color="text.secondary">
							{content}
						</Typography>
					</CardContent>
				</Card>
			</CardActionArea>
		</Grid>
	);
}

export default PostItem;