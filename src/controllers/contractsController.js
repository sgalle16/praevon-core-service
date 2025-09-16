import { contractsService } from "../services/contractsService.js";

const getContract = async (req, res, next) => {
  try {
    const contract = await contractsService.getContractById(
      parseInt(req.params.id),
      req.userId
    );
    res.json(contract);
  } catch (err) {
    next(err);
  }
};

const listMyContracts = async (req, res, next) => {
  try {
    const contracts = await contractsService.listUserContracts(req.userId);
    res.json(contracts);
  } catch (err) {
    next(err);
  }
};

const generateContractPdf = async (req, res, next) => {
  try {
    const updatedContract = await contractsService.generateAndUploadPdf(
      parseInt(req.params.id),
      req.userId
    );
    res.json({
      message: "PDF generated and uploaded successfully",
      contract: updatedContract,
    });
  } catch (err) {
    next(err);
  }
};

const getContractPdfDownloadUrl = async (req, res, next) => {
    try {
        const downloadUrl = await contractsService.getContractPdfDownloadUrl(parseInt(req.params.id), req.userId);
        res.json({ downloadUrl });
    } catch (err) {
        next(err);
    }
};

export { getContract, listMyContracts, generateContractPdf, getContractPdfDownloadUrl };
