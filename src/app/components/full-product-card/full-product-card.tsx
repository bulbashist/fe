import {
  Avatar,
  Box,
  Button,
  Card,
  Grid,
  List,
  ListItem,
  Stack,
  Typography,
} from "@mui/material";
import { Product, UserRights } from "app/types";
import defImg from "app/assets/default.webp";
import {
  CSSGap,
  CSSMargin,
  CSSPadding,
  FontWeight,
} from "app/styles/constants";
import { addToCart, changeProductAmount } from "app/pages/cart/slice";
import { useAppDispatch, useAppSelector } from "app/hooks";
import { Link, useNavigate } from "react-router-dom";
import {
  AddOutlined,
  DeleteForever,
  EditNote,
  RemoveOutlined,
} from "@mui/icons-material";
import { removeProduct, setEditingState } from "app/pages/product/store/slice";
import { useTranslation } from "react-i18next";
import { useState } from "react";

type Props = {
  product: Product;
};

export const FullProductCardComponent = ({ product }: Props) => {
  const { id: userId, rights } = useAppSelector((state) => state.core);
  const cartProduct = useAppSelector((state) => state.cart).find(
    (p) => p.product.id === product.id
  );
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [currPhoto, setCurrPhoto] = useState(0);

  const getTotal = (product: Product) => {
    return (product.price * (1 - product.discount / 100)).toFixed(2);
  };

  const addOne = () => {
    dispatch(
      changeProductAmount({
        id: product.id,
        amount: cartProduct!.count + 1,
      })
    );
  };

  const removeOne = () => {
    dispatch(
      changeProductAmount({
        id: product.id,
        amount: cartProduct!.count - 1,
      })
    );
  };

  return (
    <Card raised>
      <Box position="relative" padding={CSSPadding.Decent}>
        <Box position="absolute" top={16} right={16}>
          <Stack direction="row">
            {userId === product.seller.id || rights >= UserRights.ADMIN ? (
              <>
                <EditNote onClick={() => dispatch(setEditingState(true))} />
                <DeleteForever
                  onClick={() => {
                    dispatch(removeProduct(product.id)).then(() =>
                      navigate("/")
                    );
                  }}
                />
              </>
            ) : null}
          </Stack>
        </Box>
        <Grid
          container
          padding={CSSPadding.Small}
          justifyContent="space-around"
          alignItems="start"
        >
          <Grid item xs={5}>
            <img
              src={product.photos[currPhoto]?.url ?? defImg}
              width="100%"
              height="100%"
              style={{ objectFit: "contain" }}
              alt=""
            />
          </Grid>
          <Grid item xs={6}>
            <Box textAlign="left">
              <Stack direction="row" justifyContent="space-between">
                <Stack direction="column" width="65%">
                  <Typography variant="h3" fontWeight={FontWeight.Normal}>
                    {product.name}
                  </Typography>
                  <List>
                    <p>{product.description}</p>
                    <p>
                      {t("product_width")}: {product.width}
                    </p>
                    <p>
                      {t("product_breadth")}: {product.breadth}
                    </p>
                    <p>
                      {t("product_height")}: {product.height}
                    </p>
                    <p>
                      {t("product_category")}: {product.category.name} (
                      {product.material})
                    </p>
                    <p>
                      {t("product_manufacturer")}: {product.manufacturer.name}
                    </p>
                  </List>
                  <Card variant="outlined">
                    <Box padding={CSSPadding.Small}>
                      <Box marginBottom={CSSMargin.Tiny}>
                        <Stack direction="row" gap={CSSGap.Decent}>
                          <Typography color="GrayText">
                            {getTotal(product)} BYN
                          </Typography>
                          {product.discount ? (
                            <Typography
                              color="GrayText"
                              sx={{ textDecoration: "line-through" }}
                            >
                              {product.price} BYN{" "}
                            </Typography>
                          ) : null}
                        </Stack>
                      </Box>

                      {cartProduct ? (
                        <Stack direction="row" alignItems="center">
                          <Button variant="contained" color="success">
                            <Link to="/cart">{t("product_in_cart")}</Link>
                          </Button>
                          <Button onClick={removeOne}>
                            <RemoveOutlined />
                          </Button>
                          <Typography>{cartProduct.count}</Typography>
                          <Button onClick={addOne}>
                            <AddOutlined />
                          </Button>
                        </Stack>
                      ) : (
                        <Button
                          variant="contained"
                          fullWidth
                          disabled={!userId}
                          onClick={() =>
                            dispatch(addToCart({ product, count: 1 }))
                          }
                        >
                          {t("product_add_to_cart")}
                        </Button>
                      )}
                    </Box>
                  </Card>
                </Stack>
                <Box>
                  <ListItem>
                    <Avatar sx={{ marginRight: CSSMargin.Small }} />
                    <List>
                      <Typography variant="subtitle2">
                        {product.seller.name}
                      </Typography>
                      <Typography variant="subtitle2">
                        <Link to={`/users/${product.seller.id}`}>
                          {t("product_forward_seller")}
                        </Link>
                      </Typography>
                    </List>
                  </ListItem>
                </Box>
              </Stack>
            </Box>
          </Grid>
          <Grid item xs={12} marginTop={CSSMargin.Decent}>
            <Typography textAlign="left">{t("product_gallery")}:</Typography>
            {product.photos.length !== 0 ? (
              <Stack direction="row" gap={CSSGap.Average}>
                {product.photos.map((photo, i) => (
                  <Box
                    key={photo.id}
                    width={100}
                    onClick={() => setCurrPhoto(i)}
                    sx={{ cursor: "pointer" }}
                  >
                    <img
                      width="100%"
                      height="100%"
                      style={{ objectFit: "contain" }}
                      src={photo.url}
                      alt=""
                    />
                  </Box>
                ))}
              </Stack>
            ) : (
              <Typography textAlign="left" marginTop={CSSMargin.Small}>
                {t("product_no_img")}
              </Typography>
            )}
          </Grid>
        </Grid>
      </Box>
    </Card>
  );
};
