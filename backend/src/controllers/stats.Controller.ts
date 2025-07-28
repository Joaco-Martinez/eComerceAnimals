import { Request, Response } from 'express';
import { getOverviewStatsService, getPaymentMethodsStatsService, getPetTypeSalesService, getTopCategoriesSalesService, getTopColorsSalesService, getTopProductsSalesService, getTopSizesSalesService, getOrdersByStatusService, registerProductViewService, getUnconvertedProductsSerrvice, getEarningsByPeriodService } from '../services/stats.Service';

export const getOverview = async (req: Request, res: Response) => {
  const data = await getOverviewStatsService();
  return res.status(200).json({ content: data });
};

export const getPetTypeSales = async (req: Request, res: Response) => {
  const data = await getPetTypeSalesService(); // rename si querés
  res.status(200).json({ content: data });
};

export const getTopCategories = async (req: Request, res: Response) => {
  const data = await getTopCategoriesSalesService();
  res.status(200).json({ content: data });
};

export const getTopColors = async (req: Request, res: Response) => {
  const data = await getTopColorsSalesService();
  res.status(200).json({ content: data });
};

export const getTopSizes = async (req: Request, res: Response) => {
  const data = await getTopSizesSalesService();
  res.status(200).json({ content: data });
};


export const getPaymentMethods = async (req: Request, res: Response) => {
  const data = await getPaymentMethodsStatsService();
  res.status(200).json({ content: data });
};

export const getTopProducts = async (req: Request, res: Response) => {
  const data = await getTopProductsSalesService();
  res.status(200).json({ content: data });
};

export const getOrdersByStatus = async (req: Request, res: Response) => {
  const data = await getOrdersByStatusService();
  res.status(200).json({ content: data });
};


export const registerProductView = async (req: Request, res: Response) => {
  try {
    const productId = req.params.id;
    const userId = (req as any).user?.id ?? null;

    await registerProductViewService(productId, userId);
    res.sendStatus(204);
  } catch (error) {
    console.error('Error registrando vista', error);
    res.status(500).json({ error: 'Error al registrar vista' });
  }
};

export const getUnconvertedProducts = async (req: Request, res: Response) => {
  try {
    const data = await getUnconvertedProductsSerrvice();
    res.status(200).json({ content: data });
  } catch (error) {
    console.error('Error al obtener productos no convertidos:', error);
    res.status(500).json({ error: 'Error al obtener productos no convertidos' });
  }
};

export const earningsByPeriodController = async (req: Request, res: Response) => {
  const data = await getEarningsByPeriodService();
  res.json({ ok: true, content: data });
};