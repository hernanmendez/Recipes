if (localStorage.getItem('_hernanmendez_logged') != 'true') {
    let all_holder = document.createElement('div');
    all_holder.id = "block";
    let h_holder = document.createElement('div');
    h_holder.className = 'inside';
    all_holder.appendChild(h_holder);
    let button = document.createElement('button');
    button.innerHTML = "x";
    button.className = "close";
    button.addEventListener('click', () => {
        all_holder.parentNode.removeChild(all_holder);
    });
    let h = document.createElement('h3');
    h.innerHTML = 'Since it\'s the first time you visit us you get a pumpkin pie recipe as a gift!';
    h_holder.appendChild(h);
    h_holder.appendChild(button);
    document.getElementById('app').parentNode.insertBefore(all_holder, document.getElementById('app'));
    localStorage.setItem('_hernanmendez_logged', 'true');
    localStorage.setItem('_hernanmendez_recipes', JSON.stringify([{
        name: 'Pumpkin Pie',
        ingredients: ['Pumpkin Puree', 'Sweetened Condensed Milk', 'Eggs', 'Pumpkin Pie Spice', 'Pie Crust']
    }]));
}

class All extends React.Component {

    constructor() {

        super();
        this.state = {
            recipes: JSON.parse(localStorage.getItem('_hernanmendez_recipes')),
            edit: undefined, index: undefined
        };
    }

    add(str, index = 0) {

        this.setState({ edit: str, index: index });
        if (str == 'new') {
            document.getElementById("adding").style.display = 'block';
        } else {
            document.getElementById("editing").style.display = 'block';
            document.getElementById('editName').value = this.state.recipes[index].name;
            document.getElementById('editIngredients').value = this.state.recipes[index].ingredients.join(",");
        }
    }

    delete(index) {
        let recipes = this.state.recipes;
        recipes.splice(index, 1);
        this.setState({ recipes: recipes });
    }

    close() {
        document.getElementById('newName').value = '';
        document.getElementById('newIngredients').value = '';
        document.getElementById("adding").style.display = 'none';
        document.getElementById("editing").style.display = 'none';
    }

    done() {
        document.getElementById("adding").style.display = 'none';
        document.getElementById("editing").style.display = 'none';

        if (this.state.edit === 'new') {
            let newRecipes = this.state.recipes;
            newRecipes.push({ name: document.getElementById('newName').value, ingredients: document.getElementById('newIngredients').value.split(',') });
            this.setState({ recipes: newRecipes });
            document.getElementById('newName').value = '';
            document.getElementById('newIngredients').value = '';
        } else {
            let editedRecipe = this.state.recipes;
            editedRecipe[this.state.index].name = document.getElementById('editName').value;
            editedRecipe[this.state.index].ingredients = document.getElementById('editIngredients').value.split(',');
            this.setState({ recipes: editedRecipe });
        }
    }

    render() {
        return React.createElement(
            'div',
            { className: 'mainComponent' },
            React.createElement('br', null),
            React.createElement('br', null),
            React.createElement(
                'div',
                { id: 'editing' },
                React.createElement(
                    'div',
                    { className: 'inside' },
                    React.createElement(
                        'h4',
                        null,
                        'Recipe'
                    ),
                    React.createElement('input', { type: 'text', id: 'editName', className: 'input' }),
                    React.createElement(
                        'h4',
                        null,
                        'ingredients'
                    ),
                    React.createElement('input', { type: 'text', id: 'editIngredients', className: 'input' }),
                    React.createElement(
                        'button',
                        { onClick: this.done.bind(this) },
                        'Change recipe'
                    ),
                    React.createElement(
                        'button',
                        { onClick: this.close, className: 'close' },
                        'Close'
                    )
                )
            ),
            React.createElement(
                'div',
                { id: 'all' },
                this.state.recipes.map((f, i) => {
                    return React.createElement(
                        'div',
                        null,
                        React.createElement(
                            'div',
                            { className: 'subComponent' },
                            React.createElement(
                                'h1',
                                null,
                                f.name
                            ),
                            React.createElement(
                                'ul',
                                null,
                                f.ingredients.map(h => React.createElement(
                                    'li',
                                    null,
                                    h
                                ))
                            ),
                            React.createElement(
                                'button',
                                { onClick: this.add.bind(this, 'edit', i) },
                                'Edit'
                            ),
                            React.createElement(
                                'button',
                                { onClick: this.delete.bind(this, i), className: 'close' },
                                'Delete'
                            )
                        ),
                        React.createElement('br', null)
                    );
                }),
                React.createElement(
                    'button',
                    { onClick: this.add.bind(this, 'new') },
                    'Add a recipe'
                )
            ),
            React.createElement(
                'div',
                { id: 'adding' },
                React.createElement(
                    'div',
                    { className: 'inside' },
                    React.createElement(
                        'h4',
                        null,
                        'Recipe'
                    ),
                    React.createElement('input', { type: 'text', id: 'newName', placeholder: 'Recipe Name', className: 'input' }),
                    React.createElement(
                        'h4',
                        null,
                        'ingredients'
                    ),
                    React.createElement('input', { type: 'text', id: 'newIngredients', placeholder: 'Enter Ingredients separated by commas, example=\'Cheese,Bacon,Bread\'', className: 'input' }),
                    React.createElement(
                        'button',
                        { onClick: this.done.bind(this) },
                        'Add recipe'
                    ),
                    React.createElement(
                        'button',
                        { onClick: this.close, className: 'close' },
                        'Close'
                    )
                )
            )
        );
    }

    componentDidUpdate(prevprovs, prestate) {
        if (prestate != this.state) {
            localStorage.removeItem('_hernanmendez_recipes');
            localStorage.setItem('_hernanmendez_recipes', JSON.stringify(this.state.recipes));
        }
    }

}
ReactDOM.render(React.createElement(All, null), document.getElementById('app'));