using RecipeService.Controllers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using NUnit;
using NUnit.Framework;
using NUnit.Compatibility;
using Moq.Internals;
using RecipeServiceDomain.Repositories;
using Moq;

namespace RecipeService.Controllers.Tests
{
    [TestFixture()]
    public class RecipesControllerTests
    {
        Mock<IContextRepositories> ctxMock;
        [SetUp]
        public void SetUp()
        {
            ctxMock = new Mock<IContextRepositories>();
            ctxMock.SetupGet<>
        }
        [Test]
        public void GetTest()
        {
           
            Assert.Fail();
        }
    }
}