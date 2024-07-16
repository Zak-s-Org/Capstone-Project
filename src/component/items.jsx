
import bob from "./bob.jpg"
import roblox from "./shopping.webp"
import shirt from "./shirt.jpg"
import shirt2 from "./shirt2.jpg"

const style = {
    textAlignCenter : "center"
}

export default function Products() {
  return (
    <div className="items">
        <div className="item1">
      <table>
        <thead>
        
        <tr className="theading">
        
            <th>Hot summer fashion!</th>
       
        </tr>
        
        </thead>
        
        <tbody>
        <tr>

            <td>hot shirt<img src={shirt2} /></td>
            <td>hot shirt <img src={shirt}/></td>
        </tr>
        <tr>
            <td>Hot shirt <img src={bob} /></td>
            <td>Hot shirt <img src={roblox} /></td>
       </tr>
        </tbody>
      </table>
      </div>
      <div className="item2">
      <table>
        <thead>
        
        <tr className="theading">
        
            <th>Hot summer fashion!</th>
       
        </tr>
        
        </thead>
        
        <tbody>
        <tr>

            <td>hot shirt<img src={shirt2} /></td>
            <td>hot shirt <img src={shirt}/></td>
        </tr>
        <tr>
            <td>Hot shirt <img src={bob} /></td>
            <td>Hot shirt <img src={roblox} /></td>
       </tr>
        </tbody>
      </table>
      </div>
    </div>
  );
}
