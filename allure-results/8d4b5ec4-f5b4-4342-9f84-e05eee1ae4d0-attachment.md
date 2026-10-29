# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: web\end-to-end-shopping.spec.ts >> End-to-End Shopping Flow @master @end-to-end @regression @web
- Location: tests\web\end-to-end-shopping.spec.ts:29:5

# Error details

```
Test timeout of 30000ms exceeded.
```

```
Error: page.goto: net::ERR_ABORTED; maybe frame was detached?
Call log:
  - navigating to "https://tutorialsninja.com/demo/index.php?route=checkout/cart", waiting until "load"

```

# Page snapshot

```yaml
- generic [ref=f10e1]:
  - navigation [ref=f10e2]:
    - generic [ref=f10e3]:
      - button "$ Currency " [ref=f10e7] [cursor=pointer]:
        - strong [ref=f10e8]: $
        - text: Currency
        - generic [ref=f10e9]: 
      - list [ref=f10e11]:
        - listitem [ref=f10e12]:
          - link "" [ref=f10e13] [cursor=pointer]:
            - /url: https://tutorialsninja.com/demo/index.php?route=information/contact
          - text: "123456789"
        - listitem [ref=f10e15]:
          - link " My Account" [ref=f10e16] [cursor=pointer]:
            - /url: https://tutorialsninja.com/demo/index.php?route=account/account
            - generic [ref=f10e17]: 
            - text: My Account
        - listitem [ref=f10e19]:
          - link " Wish List (0)" [ref=f10e20] [cursor=pointer]:
            - /url: https://tutorialsninja.com/demo/index.php?route=account/wishlist
            - generic [ref=f10e21]: 
            - text: Wish List (0)
        - listitem [ref=f10e22]:
          - link " Shopping Cart" [ref=f10e23] [cursor=pointer]:
            - /url: https://tutorialsninja.com/demo/index.php?route=checkout/cart
            - generic [ref=f10e24]: 
            - text: Shopping Cart
        - listitem [ref=f10e25]:
          - link " Checkout" [ref=f10e26] [cursor=pointer]:
            - /url: https://tutorialsninja.com/demo/index.php?route=checkout/checkout
            - generic [ref=f10e27]: 
            - text: Checkout
  - banner [ref=f10e28]:
    - generic [ref=f10e30]:
      - heading [level=1] [ref=f10e33]:
        - link "Qafox.com" [ref=f10e34] [cursor=pointer]:
          - /url: https://tutorialsninja.com/demo/index.php?route=common/home
      - generic [ref=f10e36]:
        - textbox "Search" [ref=f10e37]: iPhone
        - button "" [ref=f10e39] [cursor=pointer]
      - button " 0 item(s) - $0.00" [ref=f10e43] [cursor=pointer]:
        - generic [ref=f10e44]: 
        - text: 0 item(s) - $0.00
  - navigation [ref=f10e46]:
    - generic: 
    - list [ref=f10e48]:
      - listitem [ref=f10e49]:
        - link "Desktops" [ref=f10e50] [cursor=pointer]:
          - /url: https://tutorialsninja.com/demo/index.php?route=product/category&path=20
      - listitem [ref=f10e51]:
        - link "Laptops & Notebooks" [ref=f10e52] [cursor=pointer]:
          - /url: https://tutorialsninja.com/demo/index.php?route=product/category&path=18
      - listitem [ref=f10e53]:
        - link "Components" [ref=f10e54] [cursor=pointer]:
          - /url: https://tutorialsninja.com/demo/index.php?route=product/category&path=25
      - listitem [ref=f10e55]:
        - link "Tablets" [ref=f10e56] [cursor=pointer]:
          - /url: https://tutorialsninja.com/demo/index.php?route=product/category&path=57
      - listitem [ref=f10e57]:
        - link "Software" [ref=f10e58] [cursor=pointer]:
          - /url: https://tutorialsninja.com/demo/index.php?route=product/category&path=17
      - listitem [ref=f10e59]:
        - link "Phones & PDAs" [ref=f10e60] [cursor=pointer]:
          - /url: https://tutorialsninja.com/demo/index.php?route=product/category&path=24
      - listitem [ref=f10e61]:
        - link "Cameras" [ref=f10e62] [cursor=pointer]:
          - /url: https://tutorialsninja.com/demo/index.php?route=product/category&path=33
      - listitem [ref=f10e63]:
        - link "MP3 Players" [ref=f10e64] [cursor=pointer]:
          - /url: https://tutorialsninja.com/demo/index.php?route=product/category&path=34
  - generic [ref=f10e65]:
    - list [ref=f10e66]:
      - listitem [ref=f10e67]:
        - link "" [ref=f10e68] [cursor=pointer]:
          - /url: https://tutorialsninja.com/demo/index.php?route=common/home
      - listitem [ref=f10e70]:
        - link "Search" [ref=f10e71] [cursor=pointer]:
          - /url: https://tutorialsninja.com/demo/index.php?route=product/search&search=iPhone
      - listitem [ref=f10e72]:
        - link "iPhone" [ref=f10e73] [cursor=pointer]:
          - /url: https://tutorialsninja.com/demo/index.php?route=product/product&search=iPhone&product_id=40
    - generic [ref=f10e75]:
      - generic [ref=f10e76]:
        - generic [ref=f10e77]:
          - list [ref=f10e78]:
            - listitem [ref=f10e79]:
              - link [ref=f10e80] [cursor=pointer]:
                - /url: https://tutorialsninja.com/demo/image/cache/catalog/demo/iphone_1-500x500.jpg
                - img "iPhone" [ref=f10e81]
            - listitem [ref=f10e82]:
              - link [ref=f10e83] [cursor=pointer]:
                - /url: https://tutorialsninja.com/demo/image/cache/catalog/demo/iphone_6-500x500.jpg
                - img "iPhone" [ref=f10e84]
            - listitem [ref=f10e85]:
              - link [ref=f10e86] [cursor=pointer]:
                - /url: https://tutorialsninja.com/demo/image/cache/catalog/demo/iphone_2-500x500.jpg
                - img "iPhone" [ref=f10e87]
            - listitem [ref=f10e88]:
              - link [ref=f10e89] [cursor=pointer]:
                - /url: https://tutorialsninja.com/demo/image/cache/catalog/demo/iphone_5-500x500.jpg
                - img "iPhone" [ref=f10e90]
            - listitem [ref=f10e91]:
              - link [ref=f10e92] [cursor=pointer]:
                - /url: https://tutorialsninja.com/demo/image/cache/catalog/demo/iphone_3-500x500.jpg
                - img "iPhone" [ref=f10e93]
            - listitem [ref=f10e94]:
              - link [ref=f10e95] [cursor=pointer]:
                - /url: https://tutorialsninja.com/demo/image/cache/catalog/demo/iphone_4-500x500.jpg
                - img "iPhone" [ref=f10e96]
          - list [ref=f10e97]:
            - listitem [ref=f10e98]:
              - link "Description" [ref=f10e99]:
                - /url: "#tab-description"
            - listitem [ref=f10e100]:
              - link "Reviews (0)" [ref=f10e101] [cursor=pointer]:
                - /url: "#tab-review"
          - generic [ref=f10e102]:
            - paragraph [ref=f10e104]: iPhone is a revolutionary new mobile phone that allows you to make a call by simply tapping a name or number in your address book, a favorites list, or a call log. It also automatically syncs all your contacts from a PC, Mac, or Internet service. And it lets you select and listen to voicemail messages in whatever order you want just like email.
            - text: "* * *"
        - generic [ref=f10e105]:
          - generic [ref=f10e106]:
            - button "" [ref=f10e107] [cursor=pointer]
            - button "" [ref=f10e109] [cursor=pointer]
          - heading "iPhone" [level=1] [ref=f10e111]
          - list [ref=f10e112]:
            - listitem [ref=f10e113]:
              - text: "Brand:"
              - link "Apple" [ref=f10e114] [cursor=pointer]:
                - /url: https://tutorialsninja.com/demo/index.php?route=product/manufacturer/info&manufacturer_id=8
            - listitem [ref=f10e115]: Product Code:product 11
            - listitem [ref=f10e116]: Availability:Out Of Stock
          - list [ref=f10e117]:
            - listitem [ref=f10e118]:
              - heading "$123.20" [level=2] [ref=f10e119]
            - listitem [ref=f10e120]: Ex Tax:$101.00
          - generic [ref=f10e122]:
            - generic [ref=f10e123]: Qty
            - textbox "Qty" [ref=f10e124]: "1"
            - button "Add to Cart" [active] [ref=f10e125] [cursor=pointer]
          - generic [ref=f10e126]:
            - paragraph [ref=f10e127]:
              - generic [ref=f10e128]: 
              - generic [ref=f10e130]: 
              - generic [ref=f10e132]: 
              - generic [ref=f10e134]: 
              - generic [ref=f10e136]: 
              - link "0 reviews" [ref=f10e138] [cursor=pointer]:
                - /url: ""
              - text: /
              - link "Write a review" [ref=f10e139] [cursor=pointer]:
                - /url: ""
            - separator [ref=f10e140]
      - heading "Related Products" [level=3] [ref=f10e141]
      - generic [ref=f10e144]:
        - link [ref=f10e146] [cursor=pointer]:
          - /url: https://tutorialsninja.com/demo/index.php?route=product/product&product_id=42
          - img "Apple Cinema 30\"" [ref=f10e147]
        - generic [ref=f10e148]:
          - heading [level=4] [ref=f10e149]:
            - link "Apple Cinema 30\"" [ref=f10e150] [cursor=pointer]:
              - /url: https://tutorialsninja.com/demo/index.php?route=product/product&product_id=42
          - paragraph [ref=f10e151]: The 30-inch Apple Cinema HD Display delivers an amazing 2560 x 1600 pixel resolution. Designed speci..
          - paragraph [ref=f10e152]:
            - text: $110.00 $122.00
            - generic [ref=f10e153]: Ex Tax:$90.00
        - generic [ref=f10e154]:
          - button "Add to Cart " [ref=f10e155] [cursor=pointer]:
            - text: Add to Cart
            - generic [ref=f10e156]: 
          - button "" [ref=f10e157] [cursor=pointer]
          - button "" [ref=f10e159] [cursor=pointer]
  - contentinfo [ref=f10e161]:
    - generic [ref=f10e162]:
      - generic [ref=f10e163]:
        - generic [ref=f10e164]:
          - heading "Information" [level=5] [ref=f10e165]
          - list [ref=f10e166]:
            - listitem [ref=f10e167]:
              - link "About Us" [ref=f10e168] [cursor=pointer]:
                - /url: https://tutorialsninja.com/demo/index.php?route=information/information&information_id=4
            - listitem [ref=f10e169]:
              - link "Delivery Information" [ref=f10e170] [cursor=pointer]:
                - /url: https://tutorialsninja.com/demo/index.php?route=information/information&information_id=6
            - listitem [ref=f10e171]:
              - link "Privacy Policy" [ref=f10e172] [cursor=pointer]:
                - /url: https://tutorialsninja.com/demo/index.php?route=information/information&information_id=3
            - listitem [ref=f10e173]:
              - link "Terms & Conditions" [ref=f10e174] [cursor=pointer]:
                - /url: https://tutorialsninja.com/demo/index.php?route=information/information&information_id=5
        - generic [ref=f10e175]:
          - heading "Customer Service" [level=5] [ref=f10e176]
          - list [ref=f10e177]:
            - listitem [ref=f10e178]:
              - link "Contact Us" [ref=f10e179] [cursor=pointer]:
                - /url: https://tutorialsninja.com/demo/index.php?route=information/contact
            - listitem [ref=f10e180]:
              - link "Returns" [ref=f10e181] [cursor=pointer]:
                - /url: https://tutorialsninja.com/demo/index.php?route=account/return/add
            - listitem [ref=f10e182]:
              - link "Site Map" [ref=f10e183] [cursor=pointer]:
                - /url: https://tutorialsninja.com/demo/index.php?route=information/sitemap
        - generic [ref=f10e184]:
          - heading "Extras" [level=5] [ref=f10e185]
          - list [ref=f10e186]:
            - listitem [ref=f10e187]:
              - link "Brands" [ref=f10e188] [cursor=pointer]:
                - /url: https://tutorialsninja.com/demo/index.php?route=product/manufacturer
            - listitem [ref=f10e189]:
              - link "Gift Certificates" [ref=f10e190] [cursor=pointer]:
                - /url: https://tutorialsninja.com/demo/index.php?route=account/voucher
            - listitem [ref=f10e191]:
              - link "Affiliate" [ref=f10e192] [cursor=pointer]:
                - /url: https://tutorialsninja.com/demo/index.php?route=affiliate/login
            - listitem [ref=f10e193]:
              - link "Specials" [ref=f10e194] [cursor=pointer]:
                - /url: https://tutorialsninja.com/demo/index.php?route=product/special
        - generic [ref=f10e195]:
          - heading "My Account" [level=5] [ref=f10e196]
          - list [ref=f10e197]:
            - listitem [ref=f10e198]:
              - link "My Account" [ref=f10e199] [cursor=pointer]:
                - /url: https://tutorialsninja.com/demo/index.php?route=account/account
            - listitem [ref=f10e200]:
              - link "Order History" [ref=f10e201] [cursor=pointer]:
                - /url: https://tutorialsninja.com/demo/index.php?route=account/order
            - listitem [ref=f10e202]:
              - link "Wish List" [ref=f10e203] [cursor=pointer]:
                - /url: https://tutorialsninja.com/demo/index.php?route=account/wishlist
            - listitem [ref=f10e204]:
              - link "Newsletter" [ref=f10e205] [cursor=pointer]:
                - /url: https://tutorialsninja.com/demo/index.php?route=account/newsletter
      - separator [ref=f10e206]
      - paragraph [ref=f10e207]:
        - text: Powered By
        - link "OpenCart" [ref=f10e208] [cursor=pointer]:
          - /url: http://www.opencart.com
        - text: Qafox.com © 2026
```

# Test source

```ts
  9   |     private readonly quantityInput: Locator;
  10  |     private readonly addToCartButton: Locator;
  11  |     private readonly successAlert: Locator;
  12  | 
  13  |     constructor(page: Page) {
  14  |         this.page = page;
  15  | 
  16  |         // Initialize locators with CSS selectors
  17  |         this.productHeading = page.locator('#content h1').first();
  18  |         this.quantityInput = page.locator('#input-quantity');
  19  |         this.addToCartButton = page.locator('#button-cart');
  20  |         this.successAlert = page.locator('.alert.alert-success');
  21  |     }
  22  | 
  23  |     /**
  24  |      * Checks if the product details page is displayed
  25  |      * @returns Promise<boolean> - true if the product heading is visible
  26  |      */
  27  |     async isProductPageExists(): Promise<boolean> {
  28  |         try {
  29  |             await this.productHeading.waitFor({ state: 'visible', timeout: 10000 });
  30  |             return true;
  31  |         } catch (error) {
  32  |             console.log(`Error checking product page: ${error}`);
  33  |             return false;
  34  |         }
  35  |     }
  36  | 
  37  |     /**
  38  |      * Gets the product name from the page heading
  39  |      * @returns Promise<string> - The product name
  40  |      */
  41  |     async getProductName(): Promise<string> {
  42  |         return await this.productHeading.textContent() ?? '';
  43  |     }
  44  | 
  45  |     /**
  46  |      * Sets the product quantity
  47  |      * @param quantity - Quantity value
  48  |      */
  49  |     async setQuantity(quantity: string): Promise<void> {
  50  |         await this.quantityInput.fill(quantity);
  51  |     }
  52  | 
  53  |     /**
  54  |      * Clicks the Add to Cart button
  55  |      */
  56  |     async clickAddToCart(): Promise<void> {
  57  |         await this.addToCartButton.click();
  58  |     }
  59  | 
  60  |     /**
  61  |      * Checks if the success alert is visible after adding to cart
  62  |      * @returns Promise<boolean> - true if the success alert is visible
  63  |      */
  64  |     async isSuccessAlertVisible(): Promise<boolean> {
  65  |         try {
  66  |             await this.successAlert.waitFor({ state: 'visible', timeout: 10000 });
  67  |             return true;
  68  |         } catch (error) {
  69  |             console.log(`Error checking success alert: ${error}`);
  70  |             return false;
  71  |         }
  72  |     }
  73  | 
  74  |     /**
  75  |      * Gets the success alert text
  76  |      * @returns Promise<string> - The alert text
  77  |      */
  78  |     async getSuccessAlertText(): Promise<string> {
  79  |         return await this.successAlert.textContent() ?? '';
  80  |     }
  81  | 
  82  |     /**
  83  |      * Adds a product to cart with the specified quantity and validates success
  84  |      * @param quantity - Quantity to add
  85  |      * @returns Promise<boolean> - true if successfully added
  86  |      */
  87  |     async addToCart(quantity: string): Promise<boolean> {
  88  |         try {
  89  |             await this.setQuantity(quantity);
  90  |             await this.clickAddToCart();
  91  |             const isSuccess = await this.isSuccessAlertVisible();
  92  |             if (isSuccess) {
  93  |                 const alertText = await this.getSuccessAlertText();
  94  |                 return alertText.includes('Success:');
  95  |             }
  96  |             return false;
  97  |         } catch (error) {
  98  |             console.log(`Error adding to cart: ${error}`);
  99  |             return false;
  100 |         }
  101 |     }
  102 | 
  103 |     /**
  104 |      * Opens the shopping cart page
  105 |      * @returns Promise<CartPage> - Instance of the Cart page
  106 |      */
  107 |     async openCart(): Promise<CartPage> {
  108 |         const appUrl = process.env.WEB_APP_URL || 'https://tutorialsninja.com/demo/';
> 109 |         await this.page.goto(appUrl + 'index.php?route=checkout/cart');
      |                         ^ Error: page.goto: net::ERR_ABORTED; maybe frame was detached?
  110 |         return new CartPage(this.page);
  111 |     }
  112 | }
```