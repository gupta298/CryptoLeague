<!DOCTYPE html>
<html>

<body class="stackedit">
  <div class="stackedit__html"><h1 id="cryptoleague">CRYPTOLEAGUE</h1>
  <p> A web app which lets people build their cryptocurrency portfolio using virtual money so that they can practice and make informed investments in the real world with cryptocurrency. The players will be able to participate in weekly leagues and compete with other players for the most amount of gains, and winning our prize tokens in the process! The unique competitive nature of the leagues will encourage players to learn from each other, and hence get better understanding of the market for investing in real money and hence contribute to the growth of cryptocurrencies.

  Team Members are:
  - Varun Gupta
  - Ritwik Bhardwaj
  - Nisarg Kolhe
  - Utkarsh Jain

  </p>

  <p>
    To run the app, you will have to enable CORS in Google Chrome. You can do it by using the following command: 
    open -a Google\ Chrome --args --disable-web-security --user-data-dir
  </p>

  <h1 id="accessing-the-repository">Accessing the Repository</h1>
  <p>mkdir cs307-team8<br>
  cd cs307-team8<br>
  git clone <a href="https://github.com/gupta298/CryptoLeague.git">https://github.com/gupta298/CryptoLeague.git</a><br>
  For fetching the latest code, go to the CryptoLeague directory in the cs307-team8 folder and enter the command:<br>
  git pull origin master<br>
  For starting the app server, go to the backend folder and run <code>npm start</code>. load <code>http://localhost:3000/</code> in your browser to access the app.
  </p>

  <h1 id="note">Note:</h1>
  <p>Since this repository is private, any user who wants to clone this repository has to be added to the repository as a collaborator.</p>
  <pre><code>Please email the team leader: Varun Gupta (gupta298@purdue.edu), if you would like to be added as a collaborator.
  </code></pre>
  <h1 id="rules-of-the-game">Rules of the game</h1>
  <p>User has to play with a max of 6 coins in a league, and a min of 3<br>
  User has to invest a total of $100,000 worth of crypto to build a league portfolio<br>
  One coin can’t make more than 40% of league portfolio<br>
  Top 100 coins from coinmarketcap are going to be considered in the play<br>
  One captain coin, 2x gains. Takes effect in losses too.</p>
  <h1 id="leaderboard">Leaderboard</h1>
  <p>Judged based on the number of tokens a player has.</p>
  <h1 id="leagues">Leagues:</h1>
  <h2 id="weekly-league">Weekly League</h2>
  <p>The game will start with players joining a waiting lobby to compete in a league. Once the waiting lobby has a minimum of 10 people a timer will start for 12 hours, in which other people can join, or existing players can review their coins and build their portfolio. Once the time is over, the lobby will be locked and no other players can join the existing lobby. After that, another counter for 12 hrs will start, in which all the players can make changes to their portfolios. After that, the league will start and <strong>6 x 24</strong> hours later, we will compare the total collective gain from all the players to determine the winners.</p>
  <pre><code>Note: Once the league starts, the users will not be allowed to make changes to their portfolios.
  </code></pre>
  <h2 id="rules-of-weekly-league">Rules of Weekly league:</h2>
  <p>10 min players<br>
  100 max players<br>
  Lasts for 7 x 24 hours from the time league locks in.<br>
  Lock in can also happen when 100 players join in.<br>
  1 day buffer after joining league<br>
  In buffer time, changes to portfolio are allowed<br>
  In buffer time, other players can join in</p>
  <h2 id="prize">Prize:</h2>
  <p>From all the buy-in money, we will distribute it to the winners. It will be distributed the following way:</p>
  <p>1% - 10% :     get 20% of the pool - double the money<br>
  11% - 25% :   get 30% of the pool - around 1.5 the money<br>
  26% - 50% :   get 50% of the pool - break even<br>
  50% - 100%:   loose their buy-in coins</p>
  <h1 id="exceptions-to-be-considered">Exceptions to be considered:</h1>
  <p>If a player gets &lt;25 tokens (we are assuming that 25 is the least to participate in a league) we replenish the users tokens to 25 the following week, allowing them to play again, but only after a week.</p>
  <h1 id="add-ons">Add on’s:</h1>
  <p>Friendly league<br>
  Loser coin in porfolio<br>
  Two factor auth.</p>
  </div>
  </body>

  </html>
