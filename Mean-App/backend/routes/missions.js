const express = require("express");
const multer = require("multer");

const Mission = require("../models/mission");
const checkAuth = require("../middleware/check-auth");
const mission = require("../models/mission");

const router = express.Router();

const MIME_TYPE_MAP = { /*supported image types*/
  "image/png": "png",
  "image/jpeg": "jpg",
  "image/jpg": "jpg",
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const isValid = MIME_TYPE_MAP[file.mimetype];
    let error = new Error("Invalid mime type");
    if (isValid) {
      error = null;
    }
    cb(error, "backend/images");
  },
  filename: (req, file, cb) => {
    const name = file.originalname.toLowerCase().split(" ").join("-");
    const ext = MIME_TYPE_MAP[file.mimetype];
    cb(null, name + "-" + Date.now() + "." + ext);
  },
});
/*create mission*/
router.post(
  "",
  checkAuth,
  multer({ storage: storage }).single("image"),
  (req, res, next) => {
    const post = new Mission({
      title: req.body.title,
      status: req.body.status,
      creator: req.userData.userId,
      transactions: [],
    });
    post
      .save()
      .then((createdPost) => {
        res.status(201).json({
          message: "Mission added successfully",
          post: {
            ...createdPost,
            id: createdPost._id,
          },
        });
      })
      .catch((error) => {
        res.status(500).json({
          message: "Creating a mission failed!",
        });
      });
  }
);
/*fetsh mission*/
router.get("", checkAuth, (req, res, next) => {
  const pageSize = +req.query.pagesize;
  const currentPage = +req.query.page;
  const postQuery = Mission.find({ creator: req.userData.userId });
  let fetchedPosts;
  if (pageSize && currentPage) {
    postQuery.skip(pageSize * (currentPage - 1)).limit(pageSize);
  }
  postQuery
    .then((documents) => {
      fetchedPosts = documents;
      return Mission.count();
    })
    .then((count) => {
      res.status(200).json({
        message: "Missions fetched successfully!",
        missions: fetchedPosts,
        maxMissions: count,
      });
    })
    .catch((error) => {
      res.status(500).json({
        message: "Fetching missions failed!",
      });
    });
});

/*add transaction*/
router.post(
  "/addTransaction",
  checkAuth,
  multer({ storage: storage }).single("image"),
  (req, res, next) => {

    const url = req.protocol + "://" + req.get("host");
    const imagePath = url + "/images/" + req.file.filename;

    Mission.findById(req.body.id).then((mission) => {
      if (mission) {
        const newTransaction = JSON.parse(req.body.transaction);
        newTransaction.imagePath = imagePath;

        const transactions = mission.transactions;
        transactions.push(newTransaction);

        const post = new Mission({
          _id: req.body.id,
          title: mission.title,
          status: mission.status,
          imagePath: imagePath,
          creator: req.userData.userId,
          transactions: transactions,
        });

        Mission.updateOne(
          { _id: req.body.id, creator: req.userData.userId },
          post
        ).then((result) => {
            if (result.nModified > 0) {
              res.status(200).json({ message: "Adding transaction successful!" });
            } else {
              res.status(401).json({ message: "Not authorized!" });
            }
          })
          .catch((error) => {
            res.status(500).json({
              message: "Adding transaction failed!",
            });
          });
      } else {
        res.status(500).json({ message: "Adding transaction failed!"});
      }
    }).catch((error) => {
      res.status(500).json({
        message: "Adding transaction failed!"
      });
    });
  }
);

/*update transaction we should pass the missionId and the transaction Id becase the mission contains many transaction in the same Documents*/
router.put(
  "/:idmission/:idtransaction",
  checkAuth,
  multer({ storage: storage }).single("image"),
  (req, res, next) => {

    Mission.findById(req.params.idmission).then((mission) => {
      let transaction ={};
      let imagePath = null;
      if (req.file) {
        transaction = JSON.parse(req.body.transaction);
        const url = req.protocol + "://" + req.get("host");
        imagePath = url + "/images/" + req.file.filename;
      }else
      {
        transaction = req.body;
        imagePath = transaction.imagePath;
      }
      if (mission) {
        const transactions = mission.transactions;
        let transactionToUpdate = transactions.find((obj) => {
          return obj.id === req.params.idtransaction;
        });

        transactionToUpdate.date = transaction.date;
        transactionToUpdate.typeOfFees = transaction.typeOfFees;
        transactionToUpdate.label = transaction.label;
        transactionToUpdate.amount = transaction.amount;
        transactionToUpdate.imagePath = imagePath;
        transactionToUpdate.transactionType = transaction.transactionType;

        Mission.updateOne({ _id: req.params.idmission, creator: req.userData.userId },mission).then((result) => {
            if (result.nModified > 0) {
              res.status(200).json({ message: "Transaction update successfully!" });
            } else {
              res.status(401).json({ message: "Not authorized!" });
            }
          }).catch((error) => {
            res.status(500).json({
              message: "Couldn't udpate transaction!",
            });
          });
      }
      else
      {
        res.status(500).json({
          message: "Couldn't udpate transaction!",
        });
      }
    }).catch((error) => {
      res.status(500).json({
        message: "Couldn't udpate transaction!",
      });
    });
  }
);
/*fetsh transaction*/
router.get("/:idmission/:idtransaction", checkAuth,(req, res, next) => {
  Mission.findById(req.params.idmission)
    .then(mission => {
      if (mission) {
        const transactions = mission.transactions;
        let transaction = transactions.find((obj) => {
          return obj.id === req.params.idtransaction;
        });
        res.status(200).json(transaction);
      } else {
        res.status(404).json({ message: "Transaction not found!" });
      }
    })
    .catch(error => {
      res.status(500).json({
        message: "Fetching Transaction failed!"
      });
    });
});
/*delete mission*/
router.delete("/:idmission",checkAuth, (req, res, next) => {
    Mission.deleteOne({ _id: req.params.idmission, creator: req.userData.userId })
    .then(result => {
      if (result.n > 0) {
        res.status(200).json({ message: "Deletion successful!" });
      } else {
        res.status(401).json({ message: "Not authorized!" });
      }
    })
    .catch(error => {
      res.status(500).json({
        message: "Deleting mission failed!"
      });
    });
});

/*delete transaction*/
router.delete("/:idmission/:idtransaction",checkAuth, (req, res, next) => {
    Mission.findById(req.params.idmission)
    .then(mission => {
      if (mission) {

        const transactions = mission.transactions.filter((obj) => {
          return obj.id != req.params.idtransaction;
        });

        mission.transactions = transactions;

        Mission.updateOne({ _id: req.params.idmission, creator: req.userData.userId },mission).then((result) => {
          if (result.nModified > 0) {
            res.status(200).json({ message: "Deletion successful!" });
          } else {
            res.status(401).json({ message: "Not authorized!" });
          }
        }).catch((error) => {
          console.log(error)
          res.status(500).json({
            message: "Deleting transaction failed!"
          });
        });

      } else {
        res.status(404).json({ message: "Deleting transaction failed!"});
      }
    })
    .catch(error => {
      console.log(error)
      res.status(500).json({
        message: "Deleting transaction failed!"
      });
    });
});

module.exports = router;
