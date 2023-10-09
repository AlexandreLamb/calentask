import React from 'react';
import { WithContext as ReactTags } from 'react-tag-input';
import styles from "./ReactTags.module.scss";

const KeyCodes = {
  comma: 188,
  enter: [10, 13],
};

const delimiters = [...KeyCodes.enter, KeyCodes.comma];

class TagInput extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tags: [
              
             ],
            suggestions: [
                { id: 'Clignement des yeux', text: 'Clignement des yeux' },
                { id: 'Baillement', text: 'Baillement', },
                { id: 'Paupières lourdes', text: 'Paupières lourdes', },
                { id: 'Perte de coordination', text: 'Perte de coordination' },
                { id: 'Maux de tête', text: 'Maux de tête', },
                { id: 'Muscles endolories', text: 'Muscles endolories' },
                { id: 'Yeux irrités', text: 'Yeux irrités', },
                { id: 'Cernes sous les yeux', text: 'Cernes sous les yeux', },
                { id: 'Paleur de la peau', text: 'Paleur de la peau', },
                { id: 'Mouvement ralentis', text: 'Mouvement ralentis', },
                { id: 'Posture affaissé', text: 'Posture affaissé', },
                { id: 'Yeux rouges', text: 'Yeux rouges', },
                { id: 'Difficultés de concentrations', text: 'Difficultés de concentrations', },
                { id: 'Tremblements musculaires', text: 'Tremblements musculaires', },
             ]
        };
        this.handleDelete = this.handleDelete.bind(this);
        this.handleAddition = this.handleAddition.bind(this);
        this.handleDrag = this.handleDrag.bind(this);
    }

    handleDelete(i) {
        const { tags } = this.state;
        this.setState({
         tags: tags.filter((tag, index) => index !== i),
        }, function(){
            this.props.handleTag(this.state.tags)
        });

    }

    handleAddition(tag) {
        this.setState(state => ({ tags: [...state.tags, tag] }), function(){
            this.props.handleTag(this.state.tags)
        });
    }

    handleDrag(tag, currPos, newPos) {
        const tags = [...this.state.tags];
        const newTags = tags.slice();

        newTags.splice(currPos, 1);
        newTags.splice(newPos, 0, tag);

        // re-render
        this.setState({ tags: newTags }, function(){
            this.props.handleTag(this.state.tags)
        });

    }

    render() {
        const { tags, suggestions } = this.state;
        return (
        <div className={styles.ReactTags}>

                <ReactTags tags={tags}
                    suggestions={suggestions}
                    handleDelete={this.handleDelete}
                    handleAddition={this.handleAddition}
                    handleDrag={this.handleDrag}
                    delimiters={delimiters} 
                    placeholder="Entrer un indicateur..."
                    inputFieldPosition="bottom"
                />
            </div>
        )
    }
};

export default TagInput;