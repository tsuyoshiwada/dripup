Basic:

```
class ItemCardExample extends React.Component {
  constructor(props) {
    super(props);
    this.state = { selected: false };
  }

  render() {
    return (
      <ItemCard
        style={{ width: 270 }}
        selected={this.state.selected}
        url="http://example.com/path/to/"
        title="FLAMBER Creative Design Pallete"
        image="/images/card-sample.png"
        colors={["#2D8A35", "#161815", "#4361A6"]}
        onSelect={() => this.setState({ selected: !this.state.selected })}
      />
    );
  }
}

<ItemCardExample />
```


List:

```
class ItemCardListExample extends React.Component {
  constructor(props) {
    super(props);
    this.state = { selected: false };
  }

  render() {
    return (
      <ItemCard
        layout="list"
        style={{ width: 270 }}
        selected={this.state.selected}
        url="http://example.com/path/to/"
        title="FLAMBER Creative design palette"
        image="/images/feed-card-sample2.png"
        colors={["#2D8A35", "#161815", "#4361A6"]}
        onSelect={() => this.setState({ selected: !this.state.selected })}
      />
    );
  }
}

<ItemCardListExample />
```


Gallery:

```
class ItemCardRandomGridExample extends React.Component {
  constructor(props) {
    super(props);
    this.state = { selected: false };
  }

  render() {
    return (
      <ItemCard
        layout="gallery"
        style={{ width: 270 }}
        selected={this.state.selected}
        url="http://example.com/path/to/"
        title="FLAMBER Creative Design Pallete"
        image="/images/feed-card-sample2.png"
        imageWidth={540}
        imageHeight={406}
        colors={["#2D8A35", "#161815", "#4361A6"]}
        onSelect={() => this.setState({ selected: !this.state.selected })}
      />
    );
  }
}

<ItemCardRandomGridExample />
```
