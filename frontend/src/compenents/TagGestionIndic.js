import React from 'react';
import { WithContext as ReactTags } from 'react-tag-input';
import styles from "./ReactTagsIndicateur.module.scss";
import { commonIndicator } from "./formItems";
const KeyCodes = {
  comma: 188,
  enter: [10, 13],
};

const delimiters = [...KeyCodes.enter, KeyCodes.comma];

class TagGestionIndic extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tags: []
        };
        this.handleDelete = this.handleDelete.bind(this);
        this.handleAddition = this.handleAddition.bind(this);
    }


    handleDelete(i) {
        const { tags } = this.state;
        this.setState({
         tags: tags.filter((tag, index) => index !== i),
        }, function(){
            this.props.handleIndic(this.state.tags)
        });

    }

    handleAddition(tag) {
        this.setState(state => ({ tags: [...state.tags, tag] }), function(){
            this.props.handleIndic(this.state.tags)
        });
    }

    

    render() {
       
        const {tags} = this.state;
    
        return (

        <div className={styles.ReactTags}>

                <ReactTags tags={tags}
                    handleDelete={this.handleDelete}
                    handleAddition={this.handleAddition}
                    handleDrag={this.handleDrag}
                    delimiters={delimiters}
                    inputFieldPosition="bottom"
                />
            </div>
        )
    }
};

export default TagGestionIndic;