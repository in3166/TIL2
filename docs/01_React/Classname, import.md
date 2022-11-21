## classnames 라이브러리

- css module은 객체 형식으로 className을 사용해서 너무 복잡해지거나 가독성이 나빠지는 경우가존재하는데 이를 간편하게 해결해준다.

- 사용 방법

```js
import classNames from "classnames/bind"
import styles from "./SidePannels.module.scss"

const cn = classNames.bind(styles);

// ...

  <Button
      onClick={handleAddClick}
      className={cn(menuOpen ? 'addButtonOpen' : 'addButton')}
      aria-label='Add button'
  >
```

- 사용 전

```js
<img
   className={`${css.pannelTriangle} 
   ${isOpen && path.length !== 3? css.pannelOpen: css.pannelClose} 
   ${path.length === 3 && css[`pannelArrow`]}
   ${!title && css[`imgNotFound`]} } />
```

- 사용 후

```js
<img
  className={cn(
  "pannelTriangle",
  isOpen && path.length !== 3 ? "pannelOpen" : "pannelClose",
  path.length === 3 && "pannelArrow",
  !title && "imgNotFound" )} />
```

## classnames

- `classnames.bind()`를 사용하면 난수화하지 않은 클래스명을 글로벌로 사용할 수 없다.
- 앞으로 사용법

```js
className={styles.title}
className={cx(styles.title, styles.bold)}
className={cx(styles.title, styles.bold, { [styles.show]: isShow })}
```

- 내가 짠 코드

```js
import { cx } from '../../styles/index'
//..

<RoundButton
    onClick={handleAddClick}
    className={cx({ [buttonStyles.addButtonOpen]: menuOpen },
                   { [buttonStyles.addButton]: !menuOpen })}
    aria-label='Add button'
 >
```

<br/><br/>

## import 구문 추천 순서

1. node "builtin" modules
2. "external" modules
3. "internal" modules
4. modules from a "parent" directory
5. "sibling" modules from the same or a sibling's directory
6. "index" of the current directory

<br><br><br>

<출처>
<https://hotwolf.tistory.com/26>
<https://stackoverflow.com/questions/55823296/reactjs-prevstate-in-the-new-usestate-react-hook>
<https://www.codingfactory.net/10953>
