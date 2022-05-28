import React from "react";

import './PostList.css'
import Card from "../../shared/components/UIElements/Card/Card";
import PostItem from "./PostItem";
import Button from "../../shared/components/FormElements/Button";

const PostList = props => {
    return <ul className="place-list">
        {props.items.map(place => {
            return <PostItem
                key={place.id}
                id={place.id}
                image={place.image}
                title={place.title}
                description={place.description}
                address={place.address}
                category={place.category}
                creatorId={place.creator.id}
                creatorName={place.creator.name}
                creatorImage={place.creator.image}
                coordinate={place.location}
                />
        })}
    </ul>
}

export default PostList;