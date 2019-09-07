import { storiesOf } from '@storybook/vue'

storiesOf('Content', module)
  .add('Typography', () => ({
    template: `
      <div class="section">
        <div class="container">
          <table class="table">
            <tbody>
              <tr>
                <td><code>.title</code></td>
                <td><h1 class="title">Bacon ipsum dolor amet ribeye short ribs</h1></td>
              </tr>
              <tr>
                <td><code>.subtitle</code></td>
                <td><h2 class="subtitle">Bacon ipsum dolor amet ribeye short ribs</h2></td>
              </tr>
              <tr>
                <td><code>p</code></td>
                <td>
                  <div style="width: 500px">
                    <p>Bacon ipsum dolor amet ribeye short <a href="#">ribs ground round</a> corned beef, ham hock tail flank swine pork loin tenderloin. Prosciutto tail pork buffalo turducken beef ribs pancetta doner corned beef. Porchetta chicken turducken spare ribs, pig ball tip shank capicola drumstick salami beef sausage ribeye.</p>
                    <p>Doner meatball tail bacon swine buffalo. Alcatra frankfurter meatball, meatloaf hamburger salami brisket. Buffalo biltong ham, turkey kielbasa cupim short ribs. Brisket cupim pork loin alcatra sirloin, tail doner turducken bresaola boudin swine.</p>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    `
  }))
