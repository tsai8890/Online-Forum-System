import * as React from 'react';
import Typography from '@mui/material/Typography';


import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import ThumbDownOutlinedIcon from '@mui/icons-material/ThumbDownOutlined';
import ThumbsUpDownOutlinedIcon from '@mui/icons-material/ThumbsUpDownOutlined';
import Badge from '@mui/material/Badge'

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
	let { title, username, nickname, content, rating } = post

	content = trim(content, 40);

	const ratingVal = rating.push.total - rating.down.total;
	return (
		<Grid item xs={7}>
			<CardActionArea onClick={onClick}>
				<Card sx={{ display: 'flex' }}>
					<CardContent sx={{ flex: 1 }}>
						<Stack direction='row' justifyContent='space-between' alignItems='flex-end'>
							<Box>
								<Typography component="h2" variant="h5">
									{title}
								</Typography>
								<Typography variant="subtitle1" color="text.secondary">
									{`${nickname} @${username}`}
								</Typography>
								<Typography variant="subtitle1" color="text.secondary">
									{content}
								</Typography>
							</Box>
							<Badge 
								badgeContent={(() => {
									if (ratingVal >= 0)
										return ratingVal;
									else if (ratingVal < -99)
										return '-99+'
									return ratingVal;
								})()}
								showZero
								color='primary'
								sx={{
									"& .MuiBadge-badge": {
										backgroundColor: ratingVal >= 0 ? "#6D9EEB" : '#E06666'
									},
									marginRight: '10px'
								}}
							>
								<ThumbsUpDownOutlinedIcon fontSize='small' />
							</Badge>
						</Stack>
					</CardContent>
				</Card>
			</CardActionArea>
		</Grid>
	);
}

export default PostItem;