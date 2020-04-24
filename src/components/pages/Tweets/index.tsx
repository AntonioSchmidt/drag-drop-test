import React, { useState } from 'react';
import { TextField, Button, Card, CardHeader, Typography, CardContent, Avatar } from '@material-ui/core'
import { useTweets, useDragAndDrop } from './hooks';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { DroppableArea, SpacedRow, InputControl, Container, CardHolder, SelfCenteredColumn } from './styles';

export { reducer } from './reducer';


const DraggableCard = ({ tweet }: { tweet: any}) => (
        <Card>
            <CardHeader avatar={
                <Avatar src={tweet.image}/>
            } title={tweet.name} subheader={tweet.tweetName}/>
            <CardContent>
                <Typography variant="body2" color="textSecondary" component="p">
                    {tweet.text}
                </Typography>
            </CardContent>
        </Card>
)


export const MyTweets = () => {
    const [search, setSearch] = useState<string>('')
    const { data, onSearchPress } = useTweets();
    const onDragAndDrop = useDragAndDrop()


    return (
        <Container>
            <DragDropContext onDragEnd={onDragAndDrop}>
            <InputControl>
                <TextField value={search} size="small" label="Search tweet" variant="outlined" onChange={e => setSearch(e.target.value)} />&nbsp;
                <Button variant="contained" color="primary" onClick={() => onSearchPress(search)} disabled={search === ''}>
                    Search
                </Button>
            </InputControl>
                <SpacedRow>
                    <Droppable droppableId="tweets">
                        {(provided, snapshot) => (
                            <DroppableArea
                                ref={provided.innerRef}
                            >
                                {data.tweets.map((tweet, index) => 
                                    <Draggable key={tweet.idString} draggableId={tweet.idString} index={index}>
                                        {(dragabbleProvided, draggableSnapshot) => 
                                        <CardHolder ref={dragabbleProvided.innerRef} 
                                        {...dragabbleProvided.draggableProps}
                                        {...dragabbleProvided.dragHandleProps}
                                        >
                                            <DraggableCard tweet={tweet}/>

                                        </CardHolder>
                                        }
                                    </Draggable>
                                )}
                            </DroppableArea>
                        )}
                    </Droppable>
                    <SelfCenteredColumn>
                        <Typography variant="h6" color="textSecondary">
                            Drag and Drop to save
                        </Typography>
                    </SelfCenteredColumn>
                    <Droppable droppableId="savedTweets">
                        {(provided, snapshot) => (
                                <DroppableArea
                                    ref={provided.innerRef}
                                >
                                    {data.savedTweets.map((tweet, index) => 
                                        <Draggable key={tweet.idString} draggableId={tweet.idString} index={index}>
                                            {(dragabbleProvided, draggableSnapshot) => 
                                                <CardHolder ref={dragabbleProvided.innerRef} 
                                                {...dragabbleProvided.draggableProps}
                                                {...dragabbleProvided.dragHandleProps}
                                                >
                                                    <DraggableCard tweet={tweet}/>
                                                </CardHolder>
                                            }
                                        </Draggable>
                                    )}
                                </DroppableArea>
                            )}
                    </Droppable>
                </SpacedRow>
            </DragDropContext>
        </Container>
        );
}