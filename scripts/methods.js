import randomPostGenerator from "./apiCalls";
const parseDate = (str) => {
  const ymd = str.split("-");
  return new Date(ymd[0], ymd[1] - 1, ymd[2]);
};

function stringifyDate(date) {
  return date.toISOString().substring(0, 10);
}

const stockPriceGenerator = (stckSymbol, priceDate) => {
  const stckPrice = Math.floor(Math.random() * 100);
  return {
    stckDate: stringifyDate(priceDate),
    price: stckPrice,
    stockSymbol: stckSymbol,
  };
};

const socialMediaCountGenerator = (stckSymbol, smType) => {
  const smCount = Math.floor(Math.random() * 1000);

  return {
    socialMediaType: smType,
    count: smCount,
    stockSymbol: stckSymbol,
  };
};
const recommendationAlgorithm = (
  stckPrice,
  smCount,
  algorithm,
  constants,
  risk_ratios
) => {
  let recommendation = "";

  let algorithmConsts = {};

  switch (algorithm) {
    case "Algo1":
      algorithmConsts = {
        buyTHold: 80,
        sellTHold: 30,
        smCountTHold: 550,
      };
      break;
    case "Algo2":
      algorithmConsts = {
        buyTHold: 60,
        sellTHold: 45,
        smCountTHold: 600,
      };
      break;
    case "Algo3":
      algorithmConsts = {
        buyTHold: 75,
        sellTHold: 25,
        smCountTHold: 450,
      };
      break;

    default:
      algorithmConsts = {
        buyTHold: 70,
        sellTHold: 40,
        smCountTHold: 500,
      };
      break;
  }
  if (smCount.count >= algorithmConsts.smCountTHold) {
    if (algorithmConsts.buyTHold < stckPrice.price) recommendation = "sell";
    if (algorithmConsts.sellTHold < stckPrice.price < algorithmConsts.buyTHold)
      recommendation = "hold";
    if (stckPrice.price < algorithmConsts.sellTHold) recommendation = "buy";
  } else {
    if (algorithmConsts.buyTHold < stckPrice.price) recommendation = "buy";
    if (algorithmConsts.sellTHold < stckPrice.price < algorithmConsts.buyTHold)
      recommendation = "hold";
    if (stckPrice.price < algorithmConsts.sellTHold) recommendation = "sell";
  }

  return {
    recommendation,
    stockPrice: stckPrice.price,
    recommendDate: stckPrice.stckDate,
    smCount: smCount.count,
  };
};

function displayRecommendations(resultList, stockSymbol) {
  const resultListDiv = document.getElementById("results_table");
  resultListDiv.innerHTML = "";
  resultList.forEach((recommend) => {
    let tr = document.createElement("tr");
    tr.classList.add("recommendation");

    const rec = document.createElement("td");
    rec.textContent = recommend.recommendation;
    rec.classList.add("rec", recommend.recommendation);

    const smc = document.createElement("td");
    smc.textContent = recommend.smCount;
    smc.classList.add("smc");

    const prc = document.createElement("td");
    prc.textContent = recommend.stockPrice;
    prc.classList.add("prc");

    const date = document.createElement("td");
    date.textContent = recommend.recommendDate.replace(/-/g, ".");
    date.classList.add("date");

    tr.append(date);
    tr.append(smc);
    tr.append(prc);
    tr.append(rec);

    resultListDiv.append(tr);

    document.getElementById("stock_symbol_title").textContent = stockSymbol;
    const tableSection = document.getElementById("table");
    if (tableSection.classList.contains("hidden")) {
      tableSection.classList.remove("hidden");
    }
  });
}

function handleMorePostReq() {
  displayScmPosts(2, false);
}

const displayScmPosts = (quantity, clearing) => {
  const scmPostCont = document.getElementById("social_posts");

  if (clearing) {
    scmPostCont.innerHTML = "";
  }
  for (let i = 0; i < quantity; i++) {
    randomPostGenerator().then((scmPost) => {
      const post = document.createElement("div");
      post.classList.add("scm_post");

      const title = document.createElement("h3");
      title.classList.add("scm_title");
      title.textContent = scmPost.title;

      const content = document.createElement("p");
      content.classList.add("scm_content");
      content.textContent = scmPost.content;

      const author = document.createElement("p");
      author.classList.add("scm_author");
      author.textContent = scmPost.author;

      const date = document.createElement("p");
      date.classList.add("scm_date");
      date.textContent = stringifyDate(scmPost.timestamp);

      post.append(title);
      post.append(content);
      post.append(author);
      post.append(date);

      scmPostCont.append(post);
    });
  }
};

const handleSubmit = () => {
  const fromDateStr = document.getElementById("from_date").value;
  const toDateStr = document.getElementById("to_date").value;
  const socialMediaType = document.getElementById("social_media_type").value;
  const stockSymbol = document.getElementById("stock_symbol").value;
  const algorithm = document.getElementById("algorithm").value;
  let recTable = [];

  const dayDef =
    ((parseDate(fromDateStr) - parseDate(toDateStr)) * -1) / 3600 / 1000 / 24 +
    1;

  if (parseDate(fromDateStr) > parseDate(toDateStr)) {
    alert("From Date cannot be later, than To Date");
  } else if (dayDef > 90) {
    alert("Time window cannot be larger than 90 days");
  } else {
    for (
      var date = parseDate(fromDateStr);
      date <= parseDate(toDateStr);
      date.setDate(date.getDate() + 1)
    ) {
      const recomandation = recommendationAlgorithm(
        stockPriceGenerator(stockSymbol, date),
        socialMediaCountGenerator(stockSymbol, socialMediaType),
        algorithm
      );
      recTable.push(recomandation);
    }
    displayRecommendations(recTable, stockSymbol);
    displayScmPosts(2, true);
  }
};

export {
  displayRecommendations,
  stringifyDate,
  stockPriceGenerator,
  socialMediaCountGenerator,
  recommendationAlgorithm,
  handleSubmit,
  handleMorePostReq,
};
