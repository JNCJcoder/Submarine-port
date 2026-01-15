import AssetLoader from './AssetLoader.js';
import Game from './Game.js';
import KeyHandler from './KeyHandler.js';

/** @type {HTMLCanvasElement} */
const canvas = document.getElementById("gameCanvas");
const assetLoader = new AssetLoader();
const keyHandler = new KeyHandler();

const assets = {
    images: {
        // Numbers -----------------------------
        num00:              "assets/image/num00.png",
        num01:              "assets/image/num01.png",
        num02:              "assets/image/num02.png",
        num03:              "assets/image/num03.png",
        num04:              "assets/image/num04.png",
        num05:              "assets/image/num05.png",
        num06:              "assets/image/num06.png",
        num07:              "assets/image/num07.png",
        num08:              "assets/image/num08.png",
        num09:              "assets/image/num09.png",
        num10:              "assets/image/num10.png",
        // Score -------------------------------
        hi:                 "assets/image/hi.png",
        // Menu --------------------------------
        menuBackGround:     "assets/image/tile.png",
        openingTitle:       "assets/image/openingtitle.png",
        openingSubmarine:   "assets/image/opening.png",
        jikeLogo:           "assets/image/jikelogo.png",
        hiScores:           "assets/image/hiscore.png",
        helpContent:        "assets/image/help_content.png",
        keyContent:         "assets/image/key_content.png",
        run0:               "assets/image/run0.png",
        run1:               "assets/image/run1.png",
        run2:               "assets/image/run2.png",
        run3:               "assets/image/run3.png",
        // TitleBar -----------------------------
        title:              "assets/image/title.png",
        helpTitle:          "assets/image/help_title.png",
        keyTitle:           "assets/image/key_title.png",
        // Button -------------------------------
        sfkBack:            "assets/image/sfk_back.png",
        // Submarine ---------------------------
        submarineCenter:    "assets/image/sub_ct00.png",
        submarineDown0:     "assets/image/sub_dn00.png",
        submarineDown1:     "assets/image/sub_dn01.png",
        submarineUp0:       "assets/image/sub_up00.png",
        submarineUp1:       "assets/image/sub_up01.png",
        // Explosion ---------------------------
        subExplosion0:       "assets/image/exp00.png",
        subExplosion1:       "assets/image/exp01.png",
        subExplosion2:       "assets/image/exp02.png",
        subExplosion3:       "assets/image/exp03.png",
        subExplosion4:       "assets/image/exp04.png",
        subExplosion5:       "assets/image/exp05.png",
        subExplosion6:       "assets/image/exp06.png",
        subExplosion7:       "assets/image/exp07.png",
        // Bubble ------------------------------
        bubble0:             "assets/image/trailer00.png",
        bubble1:             "assets/image/trailer01.png",
        bubble2:             "assets/image/trailer02.png",
        bubble3:             "assets/image/trailer03.png",
        bubble4:             "assets/image/trailer04.png",
        // Obstacle ----------------------------
        rock00:             "assets/image/rock00.png",
        rock01:             "assets/image/rock01.png",
        rock02:             "assets/image/rock02.png",
        octopus00:          "assets/image/octopus00.png",
        octopus01:          "assets/image/octopus01.png",
        octopus02:          "assets/image/octopus02.png",
        // Panel -------------------------------
        leftPanel:          "assets/image/leftPanel.png",
        rightPanel0:        "assets/image/rightPanel1.png",
        rightPanel1:        "assets/image/rightPanel2.png",
        rightPanel2:        "assets/image/rightPanel3.png",
        // Game Over ---------------------------
        gameOver:           "assets/image/gameover.png",
        // Pause -------------------------------
        paused:             "assets/image/paused.png"
        // -------------------------------------
    },
};

assetLoader.loadAll(assets).then(() => {
    const game = new Game(canvas, assetLoader, keyHandler);

    game.start();
}).catch((e) => console.error(e));